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
        struct Projection
        {
            mat4 projectionMatrix;
        };

        //View
        struct View
        {
            mat4 translationMatrix;
            mat4 rotationXMatrix;
            mat4 rotationYMatrix;
            mat4 rotationZMatrix;
        };

        //Model
        struct Model
        {
            mat4 translationMatrix;
            mat4 rotationXMatrix;
            mat4 rotationYMatrix;
            mat4 rotationZMatrix;
            mat4 scaleMatrix;
        };

        uniform Model model;
        uniform View view;
        uniform Projection projection;

        void main()
        {
            mat4 modelMatrix = model.translationMatrix * model.scaleMatrix * model.rotationXMatrix * model.rotationYMatrix * model.rotationZMatrix;
            mat4 viewMatrix = view.rotationXMatrix * view.rotationYMatrix * view.rotationZMatrix * view.translationMatrix;

            gl_Position = projection.projectionMatrix * viewMatrix * modelMatrix * vec4(vertexPosition, 1);

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
        struct Shape
        {
            sampler2D sampler;
            int hasColor;
            int hasTexture;
        };

        uniform Shape shape;
        
        void main()
        {
            if(shape.hasColor == 1)
            {
                fragmentColor = color;
            }
            
            if(shape.hasTexture == 1) 
            {
                vec4 textureColor = texture(shape.sampler, textureCoords);
                if(textureColor.a >= 0.2) 
                {
                    fragmentColor = color * textureColor;
                } else {
                    discard;
                }
                
            }
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