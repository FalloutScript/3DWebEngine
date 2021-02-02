export class Shader
{

    static DEFAULT_VERTEX_SHADER = `#version 300 es
        precision mediump float;

        //Inputs
        layout(location = 0) in vec3 vertexPosition;
        layout(location = 1) in vec4 vertexColor;
        layout(location = 2) in vec2 vertexTexture;

        //Outputs
        out vec4 color;
        out vec2 textureCoords;

        //Projection
        uniform mat4 projectionMatrix;

        //View
        uniform mat4 viewTranslationMatrix;
        uniform mat4 viewRotationXMatrix;
        uniform mat4 viewRotationYMatrix;
        uniform mat4 viewRotationZMatrix;

        //Model
        uniform mat4 translationMatrix;
        uniform mat4 rotationXMatrix;
        uniform mat4 rotationYMatrix;
        uniform mat4 rotationZMatrix;
        uniform mat4 scaleMatrix;

        void main()
        {
            mat4 modelMatrix =  translationMatrix * scaleMatrix * rotationXMatrix * rotationYMatrix * rotationZMatrix;
            mat4 viewMatrix =   viewRotationXMatrix * viewRotationYMatrix * viewRotationZMatrix *viewTranslationMatrix;

            gl_Position =  projectionMatrix * viewMatrix * modelMatrix * vec4(vertexPosition, 1);

            color = vertexColor;
            textureCoords = vertexTexture;
        }
    `;

    static DEFAULT_FRAGMENT_SHADER = `#version 300 es 
        precision mediump float;

        //Inputs
        in vec4 color;
        in vec2 textureCoords;

        //Outputs
        out vec4 fragmentColor;

        //Texture
        uniform sampler2D sampler;

        //Components (booleans)
        uniform int hasColor;
        uniform int hasTexture;
        
        void main()
        {
            if(hasColor == 1) fragmentColor = color;
            if(hasTexture == 1) fragmentColor = color * texture(sampler, textureCoords);
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

        this.create();
        this.parse();
        this.compile();
        this.link();
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

    bind()
    {
        if(this.programShader == 0)  throw new Error("The program shader is not created");
        this.gl.useProgram(this.programShader);
    }

    unbind()
    {
        if(this.programShader == 0)  throw new Error("The program shader is not created");
        this.gl.useProgram(null);
    }

    create()
    {
        this.programShader = this.gl.createProgram();
        this.vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    }

    parse()
    {
        if(this.vertexShader == 0) throw new Error("The vertex shader is not created");
        if(this.fragmentShader == 0) throw new Error("The fragment shader is not created");
        this.gl.shaderSource(this.vertexShader, this.vertexSource);
        this.gl.shaderSource(this.fragmentShader, this.fragmentSource);
    }

    compile()
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

    link()
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

    sendBoolData(name, data)
    {
        if(name == "") throw new Error("Can't send to an empty name");
        if(data == null) throw new Error("Can't send a null data");
        var location = this.gl.getUniformLocation(this.programShader, name);

        if(data == true)
        {   
            this.gl.uniform1i(location, 1);
        } else {
            this.gl.uniform1i(location, 0);
        }
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