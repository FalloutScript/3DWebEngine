import { Shader } from './Shader.js'

export class Renderer
{

    canvas = null;
    gl = null;
    version = "";
    glslVersion = "";
    vendor = "";
    loaded = false;
    width = 0;
    height = 0;

    constructor()
    {
        this.canvas = document.getElementById("game_canvas");
        if(this.canvas == null) throw new Error("The canvas is null");

        this.gl = this.canvas.getContext("webgl2");
        if(this.gl == null) throw new Error("The WebGL context is null");

        this.defaultShader = new Shader(this.gl, Shader.DEFAULT_VERTEX_SHADER, Shader.DEFAULT_FRAGMENT_SHADER);
        this.version = this.gl.getParameter(this.gl.VERSION);
        this.glslVersion = this.gl.getParameter(this.gl.SHADING_LANGUAGE_VERSION);
        this.vendor = this.gl.getParameter(this.gl.VENDOR);
    }

    load()
    {
        if(this.loaded == true) throw new Error("The renderer is already loaded !");
        console.log("{" + this.version + ", " + this.glslVersion + ", " + this.vendor + "}");

        this.setClearColor(0, 0, 0);
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
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        console.log(this.width);
        console.log(this.height);
        this.gl.viewport(0, 0, this.width, this.height);
    }

    unload()
    {
        if(this.loaded == false) throw new Error("The renderer is already loaded !");
        this.defaultShader.unload();
        this.gl.flush();
        this.loaded = false;
    }

    setClearColor(r, g, b)
    {
        this.gl.clearColor(r, g, b, 1);
    }

    setClearDepth(depth)
    {
        this.gl.clearDepth(depth);
    }

    getDefaultShader()
    {
        return this.defaultShader;
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