import { Engine } from "./Engine.js";

export class ElementBuffer
{

    ebo = 0;
    points = 0;
    count = 0;
    data = [];
    gl = null;
    loaded = false;

    constructor(points)
    {
        this.points = points;
        this.gl = Engine.getInstance().getRenderer().getGL();
    }

    load()
    {
        if(this.loaded == true) throw new Error("The vertex buffer is already loaded");
        
        this.ebo = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.ebo);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(this.data), this.gl.STATIC_DRAW);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
        this.loaded = true;
    }

    unload()
    {
        if(this.loaded == false) throw new Error("The vertex buffer is already unloaded");
        this.gl.deleteBuffer(this.ebo);
        this.loaded = false;
    }

    draw()
    {
        if(this.points <= 0) throw new RangeError("Can't draw an element buffer with no points");
        this.gl.drawElements(this.gl.TRIANGLES, this.points, this.gl.UNSIGNED_INT, 0);
    }

    appendIndex(value)
    {
        if(this.count == this.points) throw new RangeError("Can't add more data to the element buffer");
        this.data.push(value);
        this.count++;
    }

    bind()
    {
        if(this.vbo == 0) throw new Error("The vertex object is not created");
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.ebo);
    }

    unbind()
    {
        if(this.vbo == 0) throw new Error("The vertex object is not created");
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
    }

    isLoaded()
    {
        return this.loaded;
    }

}