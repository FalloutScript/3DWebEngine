import { Engine } from "./Engine.js";

export class VertexBuffer
{

    vbo = 0;
    points = 0;
    count = 0;
    size = 0;
    data = [];
    gl = null;
    loaded = false;

    constructor(points, size)
    {
        if(size <= 0) throw new RangeError("Can't create a vertex buffer with null or negative size !");
        if(points <= 0) throw new RangeError("Can't create a vertex buffer with null or negative number of points !");

        this.gl = Engine.getInstance().getRenderer().getGL();
        this.points = points;
        this.size = size;
    }

    load()
    {
        if(this.loaded == true) throw new Error("The vertex buffer is already loaded");
        
        this.vbo = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vbo);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.data), this.gl.STATIC_DRAW);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    }

    unload()
    {
        if(this.loaded == false) throw new Error("The vertex buffer is already unloaded");
        this.gl.deleteBuffer(this.vbo);
    }

    draw()
    {
        if(this.points <= 0) throw new RangeError("Can't draw a shape with no points");
        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.points);
    }

    configure(index, size, offset)
    {
        this.gl.vertexAttribPointer(index, size, this.gl.FLOAT, false, 0, offset);
        this.gl.enableVertexAttribArray(index);
    }

    appendCoordinate(vector)
    {
        if(this.count == this.size) throw new RangeError("Can't add more data to the shape");

        this.data.push(vector.getX());
        this.data.push(vector.getY());
        this.data.push(vector.getZ());
        this.count += 3;
    }

    appendColor(color)
    {
        if(this.count == this.size) throw new RangeError("Can't add more data to the shape");

        this.data.push(color.getRed());
        this.data.push(color.getGreen());
        this.data.push(color.getBlue());
        this.data.push(color.getAlpha());
        this.count += 4;
    }

    updateColor(color)
    {
        if(color == null) throw new Error("Can't set null color");

        var data = [];

        for(var i = 0; i < this.points; i++)
        {
            data.push(color.getRed());
            data.push(color.getGreen());
            data.push(color.getBlue());
            data.push(color.getAlpha ());
        }

        this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 3 * 4 * 3, new Float32Array(data), 0, 0);
    }

    bind()
    {
        if(this.vbo == 0) throw new Error("The vertex object is not created");
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vbo);
    }

    unbind()
    {
        if(this.vbo == 0) throw new Error("The vertex object is not created");
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    }
}