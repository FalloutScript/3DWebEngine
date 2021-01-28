import { Color } from "./Color.js";
import { Engine } from "./Engine.js";
import { Matrix4f } from "./Matrix4f.js";

export class Shape
{

    size = 0;
    count = 0;
    points = 0;
    vao = 0;
    vbo = 0;
    color = null;
    shader = null;
    gl = null;
    data = [];
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
        this.bindBuffer();
        this.shader.bindShader();
        this.shader.sendMatrix4fData("projectionMatrix", Matrix4f.projectionMatrix(900, 600, 60, 0.1, 1000));
        this.shader.sendMatrix4fData("scaleMatrix", Matrix4f.scaleMatrix(0.2, 0.2, 0.2));
        this.onDraw();
        this.shader.unbindShader();
        this.unbindBuffer();
    }

    unload()
    {
        if(this.loaded == false) throw new Error("The shape is already unloaded");
        this.onUnload();
        this.loaded = false;
    }

    appendCoordinate(x, y, z)
    {
        if(this.count == this.size) throw new RangeError("Can't add more data to the shape");

        this.data.push(x);
        this.data.push(y);
        this.data.push(z);
        this.count += 3;
    }

    appendColor(r, g, b, a)
    {
        if(this.count == this.size) throw new RangeError("Can't add more data to the shape");
        if(r < 0 || g < 0 || b < 0 || a < 0) throw new RangeError("Can't set negative color values");

        this.data.push(r);
        this.data.push(g);
        this.data.push(b);
        this.data.push(a);
        this.count += 4;
    }

    createBuffer()
    {
        this.vao = this.gl.createVertexArray();
        this.vbo = this.gl.createBuffer();

        this.bindBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vbo);
        this.unbindBuffer();
    }

    sendBuffer()
    {
        this.bindBuffer();
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.data), this.gl.STATIC_DRAW);
        this.unbindBuffer();
    }

    destroyBuffer()
    {
        this.gl.deleteVertexArray(this.vao);
        this.gl.deleteBuffer(this.vbo);
    }

    drawBuffer()
    {
        if(this.points <= 0) throw new RangeError("Can't draw a shape with no points");
        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.points);
    }

    configureBuffer(index, size, offset)
    {
        this.gl.vertexAttribPointer(index, size, this.gl.FLOAT, false, 0, offset);
        this.gl.enableVertexAttribArray(index);
    }

    bindBuffer()
    {
        if(this.vao == 0) throw new Error("The vertexArray is not created");
        this.gl.bindVertexArray(this.vao);
    }

    unbindBuffer()
    {
        if(this.vao == 0) throw new Error("The vertexArray is not created");
        this.gl.bindVertexArray(null);
    }

    setColor(color)
    {
        if(color == null) throw new Error("Can't set null color");
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