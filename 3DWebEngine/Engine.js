import { Renderer } from "./Renderer.js";

export class Engine
{

    static INSTANCE = null;

    renderer = null;
    level = null;
    loaded = false;
    date = null;

    frames = 0;
    framesPerSecond = 0;
    framesTimer = 0;
    maxFramesPerSecond = 0;

    constructor(level)
    {
        if(this.constructor == Engine) throw new Error("Can't instantiate abstract class !");
        if(Engine.INSTANCE != null) throw new Error("Can't recreate an engine (Singleton)");
        if(level == null) throw new Error("Can't set null level");

        this.level = level;
        this.renderer = new Renderer();
        Engine.INSTANCE = this;
    }

    static getInstance()
    {
        return Engine.INSTANCE;
    }

    onLoad() { throw new Error("Abstract method") }
    onUpdate() { throw new Error("Abstract method") }
    onUnload() { throw new Error("Abstract method") }

    load()
    {
        if(this.loaded == true) throw new Error("The engine is already loaded");

        this.onLoad();
        this.renderer.load();
        this.renderer.clear();
        this.level.load();
        this.loaded = true;
    }

    run()
    {
        var engine = this;
        this.frames = 0;
        this.framesTimer = 0;
        this.framesPerSecond = 0;
        this.maxFramesPerSecond = 60.0;

        var loop = window.setInterval(function() 
        {
            engine.onUpdate();
            engine.renderer.clear();
            engine.level.update();
            engine.level.draw();
            engine.renderer.update();
            engine.frames++;

            if(window.closed) 
            {
                engine.unload();
                clearInterval(loop);
            }

            if(engine.framesTimer >= 1000.0)
            {
                engine.framesPerSecond = engine.frames;
                engine.framesTimer -= 1000.0;
                engine.frames = 0;
                console.log("{FPS} " + engine.framesPerSecond);
            }

            engine.framesTimer = engine.framesTimer + (1000.0 / engine.maxFramesPerSecond);
        }, 1000.0 / this.maxFramesPerSecond);
    }

    unload()
    {
        if(this.loaded == false) throw "Engine is already unloaded !";

        this.onUnload();
        this.level.unload();
        this.renderer.unload();
        this.loaded = false;
    }

    loadLevel(level)
    {
        if(this.level != null) this.level.unload();
        this.level = level;
        this.level.load();
    }

    isLoaded()
    {
        return this.loaded;
    }

    getMaxFramesPerSecond()
    {
        return this.maxFramesPerSecond;
    }

    getRenderer()
    {
        return this.renderer;
    }

    getLevel()
    {
        return this.level;
    }
    
}