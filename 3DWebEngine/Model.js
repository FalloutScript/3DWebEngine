import { Shape } from "./Shape.js";
import { Matrix4f } from "./Matrix4f.js";
import { Engine } from "./Engine.js";

export class Model extends Shape
{

    url = null;
    mesh = null;

    constructor(name, url)
    {
        super(name, 1, 1);
        this.url = url;
    }

    onLoad()
    {
        var model = this;
        var request = new XMLHttpRequest();
        
        request.onreadystatechange = function()
        {
            if(request.readyState == XMLHttpRequest.DONE)
            {
                model.mesh = new Mesh(request.responseText);

                //Size of buffers
                model.vertexBuffer.setPoints(model.mesh.vertices.length / 3);
                model.elementBuffer.setSize(model.mesh.indices.length);
                model.vertexBuffer.setSize(model.mesh.vertices.length + model.vertexBuffer.getPoints() * 4 + model.mesh.textures.length);

                //Element Buffer
                model.elementBuffer.addDataArray(model.mesh.indices);
                
                //Vertex Buffer
                model.vertexBuffer.addDataArray(model.mesh.vertices);
                model.vertexBuffer.appendColor(model.color, model.vertexBuffer.getPoints());
                model.vertexBuffer.addDataArray(model.mesh.textures);

                model.vertexArray.load();
                model.vertexBuffer.load();
                model.elementBuffer.load();

                model.vertexArray.bind();
                model.elementBuffer.bind();
                model.vertexBuffer.bind();
                model.vertexBuffer.configure(0, 3, 0);
                model.vertexBuffer.configure(1, 4, model.vertexBuffer.points * 3 * 4);
                model.vertexBuffer.configure(2, 2, model.vertexBuffer.points * 3 * 4 + model.vertexBuffer.points * 4 * 4);
                model.vertexArray.unbind();
            }
        };

        request.open("GET", this.url, true);
        request.send();
    }

    onUpdateTexture()
    {
        if(this.mesh == null) return;
    }

    onUpdateColor()
    {
        if(this.mesh == null) return;

        var data = [];
        for(var i = 0; i < (this.vertexBuffer.points / 3); i++)
        {
            data.push(this.color.getRed());
            data.push(this.color.getGreen());
            data.push(this.color.getBlue());
            data.push(this.color.getAlpha());
        }
        this.vertexArray.bind();
        this.vertexBuffer.bind();
        this.gl.bufferSubData(this.gl.ARRAY_BUFFER, this.vertexBuffer.points * 3 * 4, new Float32Array(data), 0, 0);
        this.vertexArray.unbind();
    }

    onDraw()
    {
        if(this.mesh == null) return;

        var renderer = Engine.getInstance().getRenderer();
        var level = Engine.getInstance().getLevel();
        
        this.shader.bind();
        this.shader.sendMatrix4fData("projection.projectionMatrix", Matrix4f.projectionMatrix(renderer.getWidth(), renderer.getHeight(), 60, 0.1, 1000));
        this.shader.sendMatrix4fData("model.scaleMatrix", Matrix4f.scaleMatrix(this.scale));
        this.shader.sendMatrix4fData("model.translationMatrix", Matrix4f.translationMatrix(this.position));
        this.shader.sendMatrix4fData("model.rotationXMatrix", Matrix4f.rotationXMatrix(this.rotation.getX()));
        this.shader.sendMatrix4fData("model.rotationYMatrix", Matrix4f.rotationYMatrix(this.rotation.getY()));
        this.shader.sendMatrix4fData("model.rotationZMatrix", Matrix4f.rotationZMatrix(this.rotation.getZ()));

        if(this.isFollowingCamera() == false)
        {
            this.shader.sendMatrix4fData("view.translationMatrix", Matrix4f.viewTranslationMatrix(level.getCamera().getPosition()));
            this.shader.sendMatrix4fData("view.rotationXMatrix", Matrix4f.rotationXMatrix(level.getCamera().getRotation().getX()));
            this.shader.sendMatrix4fData("view.rotationYMatrix", Matrix4f.rotationYMatrix(level.getCamera().getRotation().getY()));
            this.shader.sendMatrix4fData("view.rotationZMatrix", Matrix4f.rotationZMatrix(level.getCamera().getRotation().getZ()));
        } else {
            this.shader.sendMatrix4fData("view.translationMatrix", Matrix4f.identity());
            this.shader.sendMatrix4fData("view.rotationXMatrix", Matrix4f.identity());
            this.shader.sendMatrix4fData("view.rotationYMatrix", Matrix4f.identity());
            this.shader.sendMatrix4fData("view.rotationZMatrix", Matrix4f.identity());
        }
        
        if(this.color != null)
        {
            this.shader.sendBoolData("shape.hasColor", true);
        } else {
            this.shader.sendBoolData("shape.hasColor", false);
        }
        
        if(this.texture != null)
        {
            this.shader.sendBoolData("shape.hasTexture", true);
        } else {
            this.shader.sendBoolData("shape.hasTexture", false);
        }
        
        if(this.texture != null) this.texture.bind();
        this.vertexArray.bind();
        this.elementBuffer.draw();
        this.vertexArray.unbind();
        if(this.texture != null) this.texture.unbind();
    }

    onUnload()
    {
        if(this.mesh == null) return;
        this.elementBuffer.unload();
        this.vertexBuffer.unload();
        this.vertexArray.unload();
    }

}