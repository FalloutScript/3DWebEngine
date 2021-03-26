import { Engine } from "./Engine.js";

export class ElementBuffer
{

    ebo = 0;
    size = 0;
    count = 0;
    data = [];
    gl = null;
    loaded = false;

    constructor(size)
    {
        this.size = size;
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
        if(this.loaded == false) throw new Error("The element buffer is already unloaded");
	this.count = 0;
	this.data = [];
        this.gl.deleteBuffer(this.ebo);
        this.loaded = false;
    }

    draw()
    {
        if(this.size <= 0) throw new RangeError("Can't draw an element buffer with no size");
        this.gl.drawElements(this.gl.TRIANGLES, this.size, this.gl.UNSIGNED_INT, 0);
    }

    appendIndex(value)
    {
        if(this.count == this.size) throw new RangeError("Can't add more data to the element buffer");
        this.data.push(value);
        this.count++;
    }

    addDataArray(data)
    {
        for(var i = 0; i < data.length; i++)
        {
            if(data[i] != null) this.data.push(data[i]);
        }
    }

    setData(data)
    {
        this.data = data;
    }

    setSize(size)
    {
        this.size = size;
    }

    bind()
    {
        if(this.ebo == 0) throw new Error("The vertex object is not created");
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.ebo);
    }

    unbind()
    {
        if(this.ebo == 0) throw new Error("The vertex object is not created");
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
    }

    getSize()
    {
        return this.size;
    }

    getCount()
    {
        return this.count;
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