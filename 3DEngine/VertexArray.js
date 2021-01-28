import { Engine } from "./Engine.js";

export class VertexArray
{

    vao = 0;
    gl = null;
    loaded = false;

    constructor()
    {
        this.gl = Engine.getInstance().getRenderer().getGL();
    }

    load()
    {
        if(this.loaded == true) throw new Error("The vertex array is already loaded");

        this.vao = this.gl.createVertexArray();
        this.loaded = true;
    }

    unload()
    {
        if(this.loaded == false) throw new Error("The vertex array is already unloaded");

        this.vertexBuffer.unload();
        this.gl.deleteVertexArray(this.vao);
        this.loaded = false;
    }

    bind()
    {
        if(this.vao == 0) throw new Error("The vertex array is not created");
        this.gl.bindVertexArray(this.vao);
    }

    unbind()
    {
        if(this.vao == 0) throw new Error("The vertex array is not created");
        this.gl.bindVertexArray(null);
    }

}