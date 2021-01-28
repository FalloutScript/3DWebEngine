export class Shader
{

    static DEFAULT_VERTEX_SHADER = `#version 300 es
        layout(location = 0) in vec3 vertexPosition;
        layout(location = 1) in vec4 vertexColor;

        out vec4 outColor;

        uniform mat4 projectionMatrix;
        uniform mat4 scaleMatrix;

        void main()
        {
            outColor = vertexColor;

            gl_Position = projectionMatrix * scaleMatrix * vec4(vertexPosition, 1);
        }
    `;

    static DEFAULT_FRAGMENT_SHADER = `#version 300 es
        precision highp float;

        in vec4 outColor;
        out vec4 fragmentColor;
        
        void main()
        {
            fragmentColor = outColor;
        }
    `;

    gl = null;
    vertexSource = "";
    fragmentSource = "";
    programShader = 0;
    vertexShader = 0;
    fragmentShader = 0;
    loaded = false;

    constructor(gl, vertexSource, fragmentSource)
    {
        this.gl = gl;
        this.vertexSource = vertexSource;
        this.fragmentSource = fragmentSource;
    }

    load()
    {
        if(this.loaded == true) throw new Error("The shader is already loaded");

        this.createShader();
        this.parseShader();
        this.compileShader();
        this.linkShader();
        this.loaded = true;
    }

    unload()
    {
        if(this.loaded == false) throw new Error("The shader is already unloaded");

        this.gl.deleteShader(this.vertexShader);
        this.gl.deleteShader(this.fragmentShader);
        this.gl.deleteProgram(this.programShader);
        this.loaded = false;
    }

    bindShader()
    {
        if(this.programShader == 0)  throw new Error("The program shader is not created");
        this.gl.useProgram(this.programShader);
    }

    unbindShader()
    {
        if(this.programShader == 0)  throw new Error("The program shader is not created");
        this.gl.useProgram(null);
    }

    createShader()
    {
        this.programShader = this.gl.createProgram();
        this.vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    }

    parseShader()
    {
        if(this.vertexShader == 0) throw new Error("The vertex shader is not created");
        if(this.fragmentShader == 0) throw new Error("The fragment shader is not created");
        this.gl.shaderSource(this.vertexShader, this.vertexSource);
        this.gl.shaderSource(this.fragmentShader, this.fragmentSource);
    }

    compileShader()
    {
        if(this.vertexShader == 0) throw new Error("The vertex shader is not created");
        if(this.fragmentShader == 0) throw new Error("The fragment shader is not created");

        this.gl.compileShader(this.vertexShader);
        this.gl.compileShader(this.fragmentShader);

        var vertexError = this.gl.getShaderInfoLog(this.vertexShader);
        var fragmentError = this.gl.getShaderInfoLog(this.fragmentShader);
        if(vertexError != "") console.log(vertexError);
        if(fragmentError != "") console.log(fragmentError);
    }

    linkShader()
    {
        if(this.vertexShader == 0) throw new Error("The vertex shader is not created");
        if(this.fragmentShader == 0) throw new Error("The fragment shader is not created");
        if(this.programShader == 0) throw new Error("The program shader is not created");

        this.gl.attachShader(this.programShader, this.vertexShader);
        this.gl.attachShader(this.programShader, this.fragmentShader);
        this.gl.linkProgram(this.programShader);

        var programError = this.gl.getProgramInfoLog(this.programShader);
        if(programError != "") console.log(programError);
    }

    sendFloatData(name, data)
    {
        if(name == "") throw new Error("Can't send to an empty name");
        if(data == null) throw new Error("Can't send a null data");
        var location = this.gl.getUniformLocation(this.programShader, name);
        this.gl.uniform1f(location, data);
    }

    sendMatrix4fData(name, data)
    {
        if(name == "") throw new Error("Can't send to an empty name");
        if(data == null) throw new Error("Can't send a null data");
        var location = this.gl.getUniformLocation(this.programShader, name);
        this.gl.uniformMatrix4fv(location, false, new Float32Array(data.getData()));
    }

}