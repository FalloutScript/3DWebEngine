import { Engine } from "./Engine.js";

export class Texture
{

    name = "";
    path = "";
    image = null;
    gl = null;
    loaded = false;
    width = 0;
    height = 0;
    id = 0;

    constructor(name, path)
    {
        this.name = name;
        this.path = path;
        this.image = new Image();
        this.image.src = path;
        this.width = this.image.width;
        this.height = this.image.height;
        this.gl = Engine.getInstance().getRenderer().getGL();
    }

    load()
    {
        if(this.loaded == true) throw new Error("The texture is already loaded");

        this.id = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.id);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);	
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.width, this.height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.image);
        this.loaded = true;
    }

    unload()
    {
        if(this.loaded == false) throw new Error("The texture is already unloaded");
        this.gl.deleteTexture(this.id);
        this.loaded = false;
    }

    bind()
    {
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.id);
    }

    unbind()
    {
        this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    }

    getName()
    {
        return this.name;
    }

    getPath()
    {
        return this.path;
    }

};