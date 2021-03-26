import { Shader } from './Shader.js'
import { Color } from './Color.js'

export class Renderer
{

    canvas = null;
    gl = null;
    version = "";
    glslVersion = "";
    vendor = "";
    render = ""
    loaded = false;
    width = 0;
    height = 0;

    constructor()
    {
        this.canvas = document.getElementById("game_canvas");
        if(this.canvas == null) throw new Error("Can't find the canvas");

        this.gl = this.canvas.getContext("webgl2", {preserveDrawingBuffer: true, antialias: false, alpha: true, depth: true, desynchronized: false});
        if(this.gl == null) throw new Error("Can't load the WebGL context");
        
        this.defaultShader = new Shader(this.gl, Shader.DEFAULT_VERTEX_SHADER, Shader.DEFAULT_FRAGMENT_SHADER);
        this.version = this.gl.getParameter(this.gl.VERSION);
        this.glslVersion = this.gl.getParameter(this.gl.SHADING_LANGUAGE_VERSION);
        this.vendor = this.gl.getParameter(this.gl.VENDOR);
        this.render = this.gl.getParameter(this.gl.RENDERER);
    }

    load()
    {
        if(this.loaded == true) throw new Error("The renderer is already loaded !");
        console.log("{" + this.render + ", " + this.version + ", " + this.glslVersion + ", " + this.vendor + "}");

        this.setClearColor(Color.BLACK);
        this.setClearDepth(1);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.defaultShader.load();

        this.loaded = true;
    }

    clear()
    {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }

    update()
    {
        this.width = this.canvas.width;
        this.height = this.canvas.height;
		this.gl.viewport(0, 0, this.width, this.height);
    }

    unload()
    {
        if(this.loaded == false) throw new Error("The renderer is already unloaded !");
        this.defaultShader.unload();
        this.gl.flush();
        this.loaded = false;
    }

    setClearColor(color)
    {
        this.gl.clearColor(color.getRed(), color.getGreen(), color.getBlue(), 1);
    }

    setClearDepth(depth)
    {
        this.gl.clearDepth(depth);
    }

    getDefaultShader()
    {
        return this.defaultShader;
    }

    getWidth()
    {
        return this.width;
    }

    getHeight()
    {
        return this.height;
    }

    getGL()
    {
        return this.gl;
    }

    getCanvas()
    {
        return this.canvas;
    }

    isLoaded()
    {
        return this.loaded;
    }

}