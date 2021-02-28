import { Engine } from "./Engine.js";

export class Texture
{

    name = "";
    path = "";
    id = 0;
    image = null;
    gl = null;
    loaded = false;

    constructor(name, path)
    {
        this.image = new Image();
        this.image.src = path;
        this.name = name;
        this.path = path;
        this.gl = Engine.getInstance().getRenderer().getGL();
    }

    load()
    {
        if(this.loaded == true) throw new Error("The texture is already loaded");

        var texture = this;
        this.image.onload = function()
        {
            texture.id = texture.gl.createTexture();
            texture.gl.bindTexture(texture.gl.TEXTURE_2D, texture.id);
            texture.gl.texParameteri(texture.gl.TEXTURE_2D, texture.gl.TEXTURE_WRAP_S, texture.gl.REPEAT);	
            texture.gl.texParameteri(texture.gl.TEXTURE_2D, texture.gl.TEXTURE_WRAP_T, texture.gl.REPEAT);
            texture.gl.texParameteri(texture.gl.TEXTURE_2D, texture.gl.TEXTURE_MIN_FILTER, texture.gl.LINEAR);
            texture.gl.texParameteri(texture.gl.TEXTURE_2D, texture.gl.TEXTURE_MAG_FILTER, texture.gl.LINEAR);
            texture.gl.texImage2D(texture.gl.TEXTURE_2D, 0, texture.gl.RGBA, texture.image.width, texture.image.height, 0, texture.gl.RGBA, texture.gl.UNSIGNED_BYTE, texture.image);
            texture.gl.bindTexture(texture.gl.TEXTURE_2D, null);
            texture.loaded = true;
        }
    }

    unload()
    {
        if(this.loaded == false) throw new Error("The texture is already unloaded");
        this.gl.deleteTexture(this.id);
        this.loaded = false;
    }

    bind()
    {
        if(this.loaded == false) return;
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.id);
    }

    unbind()
    {
        if(this.loaded == false) return;
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

    getImage()
    {
        return this.image;
    }

    isLoaded()
    {
        return this.loaded;
    }

};