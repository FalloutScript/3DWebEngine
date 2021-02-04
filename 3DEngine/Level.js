import { Camera } from "./Camera.js";

export class Level
{

    camera = null;
    shapes = [];
    textures = [];
    shapesCount = 0;
    texturesCount = 0;
    loaded = false;

    constructor()
    {
        if(this.constructor == Level) throw new Error("Can't instantiate abstract class !");
        this.camera = new Camera();
    }

    onLoad() { throw new Error("Abstract method") }
    onUpdate() { throw new Error("Abstract method") }
    onDraw() { throw new Error("Abstract method") }
    onUnload() { throw new Error("Abstract method") }

    load()
    {
        if(this.loaded == true) throw new Error("The level is already loaded");
        this.onLoad();
        
        for(var i = 0; i < this.texturesCount; i++)
        {
            if(this.textures[i] != null) this.textures[i].load();
        }
        
        for(var i = 0; i < this.shapesCount; i++)
        {
            if(this.shapes[i] != null) this.shapes[i].load();
        }

        this.loaded = true;
    }

    update()
    {
        this.onUpdate();
    }

    draw()
    {
        this.onDraw();
        for(var i = 0; i < this.shapesCount; i++)
        {
            if(this.shapes[i] != null) this.shapes[i].draw();
        }
    }

    unload()
    {
        if(this.loaded == false) throw new Error("The level is already unloaded");
        this.onUnload();
        
        for(var i = 0; i < this.shapesCount; i++)
        {
            if(this.shapes[i] != null) this.shapes[i].unload();
        }

        for(var i = 0; i < this.texturesCount; i++)
        {
            if(this.textures[i] != null) this.textures[i].unload();
        }

        this.loaded = false;
    }

    addTexture(texture)
    {
        if(texture == null) throw new Error("Can't add null texture");
        this.textures.push(texture);
        this.texturesCount++;
    }

    addShape(shape)
    {
        if(shape == null) throw new Error("Can't add null shape");
        this.shapes.push(shape);
        this.shapesCount++;
    }

    removeShape(shape)
    {
        for(var i = 0; i < this.shapesCount; i++)
        {
            if(this.shapes[i] == shape)
            {
                this.shapes.splice(i, 1);
                this.shapesCount--;
                break;
            } 
        }
    }

    removeTexture(texture)
    {
        for(var i = 0; i < this.texturesCount; i++)
        {
            if(this.textures[i] == texture)
            {
                this.textures.splice(i, 1);
                this.texturesCount--;
                break;
            } 
        }
    }

    getShape(name)
    {
        for(var i = 0; i < this.shapesCount; i++)
        {
            if(this.shapes[i] != null && this.shapes[i].getName() == name)
            {
                return this.shapes[i];
            } 
        }
        return null;
    }

    getTexture(name)
    {
        for(var i = 0; i < this.texturesCount; i++)
        {
            if(this.textures[i] != null && this.textures[i].getName() == name)
            {
                return this.textures[i];
            } 
        }
        return null;
    }

    containsShape(shape)
    {
        for(var i = 0; i < this.shapesCount; i++)
        {
            if(this.shapes[i] == shape) return true;
        }
        return false;
    }

    containsTexture(texture)
    {
        for(var i = 0; i < this.texturesCount; i++)
        {
            if(this.textures[i] == texture) return true;
        }
        return false;
    }

    getCamera()
    {
        return this.camera;
    }

    getShapes()
    {
        return this.shapes;
    }

    getTextures()
    {
        return this.textures;
    }

    getShapesCount()
    {
        return this.shapesCount;
    }

    getTexturesCount()
    {
        return this.texturesCount;
    }

    isLoaded()
    {
        return this.loaded;
    }

}