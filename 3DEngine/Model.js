import { Shape } from "./Shape.js";
import { Matrix4f } from "./Matrix4f.js";
import { Engine } from "./Engine.js";

export class Model extends Shape
{

    mesh = null;

    constructor(name, model)
    {
        super(name, 1, 1);
        this.mesh = new Mesh(document.getElementById(model).textContent);
        console.log(this);
    }

    onLoad()
    {
        this.vertexBuffer.points = this.mesh.vertices.length / 3;
        this.elementBuffer.points = this.mesh.indices.length;

        this.vertexBuffer.size = this.mesh.vertices.length;
        this.elementBuffer.size = this.mesh.indices.length;

        this.vertexBuffer.data = this.mesh.vertices;
        this.elementBuffer.data = this.mesh.indices;

        this.vertexBuffer.appendColor(this.color, this.vertexBuffer.size);

        this.vertexArray.load();
        this.vertexBuffer.load();
        this.elementBuffer.load();
        
        this.vertexArray.bind();
        this.elementBuffer.bind();
        this.vertexBuffer.bind();
        this.vertexBuffer.configure(0, 3, 0);
        this.vertexBuffer.configure(1, 4, this.vertexBuffer.points * 3 * 4);
        this.vertexBuffer.configure(2, 2, this.vertexBuffer.points * 3 * 4 + this.vertexBuffer.points * 4 * 4);
    }

    onUpdateTexture()
    {

    }

    onUpdateColor()
    {
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
    }

    onDraw()
    {
        var renderer = Engine.getInstance().getRenderer();
        var level = Engine.getInstance().getLevel();

        if(this.texture != null) this.texture.bind();
        this.shader.bind();
        this.vertexArray.bind();
        this.shader.sendMatrix4fData("projectionMatrix", Matrix4f.projectionMatrix(renderer.getWidth(), renderer.getHeight(), 60, 0.1, 1000));
        this.shader.sendMatrix4fData("scaleMatrix", Matrix4f.scaleMatrix(this.scale));
        this.shader.sendMatrix4fData("translationMatrix", Matrix4f.translationMatrix(this.position));
        this.shader.sendMatrix4fData("rotationXMatrix", Matrix4f.rotationXMatrix(this.rotation.getX()));
        this.shader.sendMatrix4fData("rotationYMatrix", Matrix4f.rotationYMatrix(this.rotation.getY()));
        this.shader.sendMatrix4fData("rotationZMatrix", Matrix4f.rotationZMatrix(this.rotation.getZ()));

        if(this.isFollowingCamera() == false)
        {
            this.shader.sendMatrix4fData("viewTranslationMatrix", Matrix4f.viewTranslationMatrix(level.getCamera().getPosition()));
            this.shader.sendMatrix4fData("viewRotationXMatrix", Matrix4f.rotationXMatrix(level.getCamera().getRotation().getX()));
            this.shader.sendMatrix4fData("viewRotationYMatrix", Matrix4f.rotationYMatrix(level.getCamera().getRotation().getY()));
            this.shader.sendMatrix4fData("viewRotationZMatrix", Matrix4f.rotationZMatrix(level.getCamera().getRotation().getZ()));
        } else {
            this.shader.sendMatrix4fData("viewTranslationMatrix", Matrix4f.identity());
            this.shader.sendMatrix4fData("viewRotationXMatrix", Matrix4f.identity());
            this.shader.sendMatrix4fData("viewRotationYMatrix", Matrix4f.identity());
            this.shader.sendMatrix4fData("viewRotationZMatrix", Matrix4f.identity());
        }

        this.shader.sendBoolData("hasColor", true);
        this.shader.sendBoolData("hasTexture", false);
        this.elementBuffer.draw();
    }

    onUnload()
    {
        this.elementBuffer.unload();
        this.vertexBuffer.unload();
        this.vertexArray.unload();
    }

}