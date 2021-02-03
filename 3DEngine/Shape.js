import { Color } from "./Color.js";
import { Vector3f } from "./Vector3f.js";
import { Engine } from "./Engine.js";
import { VertexArray } from "./VertexArray.js";
import { VertexBuffer } from "./VertexBuffer.js";
import { ElementBuffer } from "./ElementBuffer.js";

export class Shape
{

    name = "";
    position = null;
    scale = null;
    rotation = null;
    vertexArray = null;
    vertexBuffer = null;
    elementBuffer = null;
    texture = null;
    color = null;
    shader = null;
    gl = null;
    loaded = false;
    followingCamera = false;

    constructor(name, points, size)
    {
        if(this.constructor == Shape) throw new TypeError("Can't instantiate abstract class");
        if(size <= 0) throw new RangeError("Can't create a shape with null or negative size");
        if(points <= 0) throw new RangeError("Can't create a shape with null or negative number of points");
        
        this.name = name;
        this.color = new Color(1, 1, 1, 1);
        this.position = new Vector3f(0, 0, 0);
        this.scale = new Vector3f(1, 1, 1);
        this.rotation = new Vector3f(0, 0, 0);
        this.shader = Engine.getInstance().getRenderer().getDefaultShader();
        this.gl = Engine.getInstance().getRenderer().getGL();
        this.vertexArray = new VertexArray();
        this.vertexBuffer = new VertexBuffer(points, size);
        this.elementBuffer = new ElementBuffer(points);
    }
    
    onLoad(){throw new Error("Abstract method")}
    onUpdateColor(){throw new Error("Abstract method")}
    onUpdateTexture(){throw new Error("Abstract method")}
    onDraw(){throw new Error("Abstract method")}
    onUnload(){throw new Error("Abstract method")}

    load()
    {
        if(this.loaded == true) throw new Error("The shape is already loaded");
        this.onLoad();
        this.loaded = true;
    }

    draw()
    {
        this.onDraw();
    }

    updateColor()
    {
        this.onUpdateColor();
    }

    updateTexture()
    {
        this.onUpdateTexture();
    }

    unload()
    {
        if(this.loaded == false) throw new Error("The shape is already unloaded");
        this.onUnload();
        this.loaded = false;
    }

    setFollowingCamera(value)
    {
        this.followingCamera = value;
    }

    setTexture(texture)
    {
        if(texture == null) throw new Error("Can't set null texture");
        this.texture = texture;
        if(this.vertexBuffer.isLoaded() == true) this.updateTexture();
    }

    setColor(color)
    {
        if(color == null) throw new Error("Can't set null color");
        this.color = color;
        if(this.vertexBuffer.isLoaded() == true) this.updateColor();
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

    getPosition()
    {
        return this.position;
    }

    getName()
    {
        return this.name;
    }

    getScale()
    {
        return this.scale;
    }

    getRotation()
    {
        return this.rotation;
    }

    isFollowingCamera()
    {
        return this.followingCamera;
    }

    isLoaded()
    {
        return this.loaded;
    }

}