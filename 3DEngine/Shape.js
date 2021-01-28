import { Color } from "./Color.js";
import { Engine } from "./Engine.js";
import { VertexArray } from "./VertexArray.js";
import { VertexBuffer } from "./VertexBuffer.js";

export class Shape
{
    vertexArray = null;
    vertexBuffer = null;
    color = null;
    shader = null;
    gl = null;
    loaded = false;

    constructor(points, size)
    {
        if(this.constructor == Shape) throw new TypeError("Can't instantiate abstract class !");
        if(size <= 0) throw new RangeError("Can't create a shape with null or negative size !");
        if(points <= 0) throw new RangeError("Can't create a shape with null or negative number of points !");
        
        this.size = size;
        this.points = points;
        this.color = new Color(1, 1, 1, 1);
        this.shader = Engine.getInstance().getRenderer().getDefaultShader();
        this.gl = Engine.getInstance().getRenderer().getGL();
        this.vertexArray = new VertexArray();
        this.vertexBuffer = new VertexBuffer(points, size);
    }
    
    onLoad(){throw new Error("Abstract method")}
    onUpdate(){throw new Error("Abstract method")}
    onUnload(){throw new Error("Abstract method")}

    load()
    {
        if(this.loaded == true) throw new Error("The shape is already loaded");
        this.onLoad();
        this.loaded = true;
    }

    draw()
    {
        this.vertexArray.bind();
        this.shader.bind();
        this.onDraw();
        this.vertexBuffer.draw();
        this.vertexArray.unbind();
        this.shader.unbind();
    }

    unload()
    {
        if(this.loaded == false) throw new Error("The shape is already unloaded");
        this.onUnload();
        this.loaded = false;
    }

    setColor(color)
    {
        if(color == null) throw new Error("Can't set null color");
        this.vertexBuffer.updateColor(color);
        this.color = color;
    }

    setShader(shader)
    {
        if(shader == null) throw new Error("Can't set null shader");
        this.shader = shader;
    }

    getColor()
    {
        return this.color;
    }

    getShader()
    {
        return this.shader;
    }

    getData()
    {
        return this.data;
    }

    isLoaded()
    {
        return this.loaded;
    }

}