import { Shape } from "./Shape.js";
import { Matrix4f } from "./Matrix4f.js";
import { Vector3f } from "./Vector3f.js";
import { Engine } from "./Engine.js";

export class Quad extends Shape
{

    constructor(name)
    {
        super(name, 6, 4 * 3 + 4 * 4 + 4 * 2);
    }

    onLoad()
    {
        var topLeft = new Vector3f(-1, 1, 0);
        var topRight = new Vector3f(1, 1, 0);
        var downLeft = new Vector3f(-1, -1, 0);
        var downRight = new Vector3f(1, -1, 0);

        //Quad
        this.vertexBuffer.appendCoordinate(topLeft);
        this.vertexBuffer.appendCoordinate(topRight);
        this.vertexBuffer.appendCoordinate(downLeft);
        this.vertexBuffer.appendCoordinate(downRight);

        //Color
        this.vertexBuffer.appendColor(this.color, 4);

        //Texture coords
        this.vertexBuffer.appendTextureCoordinate(0, 0);
        this.vertexBuffer.appendTextureCoordinate(1, 0);
        this.vertexBuffer.appendTextureCoordinate(0, 1);
        this.vertexBuffer.appendTextureCoordinate(1, 1);

        this.elementBuffer.appendIndex(0);
        this.elementBuffer.appendIndex(1);
        this.elementBuffer.appendIndex(2);
        this.elementBuffer.appendIndex(1);
        this.elementBuffer.appendIndex(2);
        this.elementBuffer.appendIndex(3);

        this.vertexArray.load();
        this.vertexBuffer.load();
        this.elementBuffer.load();
        
        this.vertexArray.bind();
        this.elementBuffer.bind();
        this.vertexBuffer.bind();
        this.vertexBuffer.configure(0, 3, 0);
        this.vertexBuffer.configure(1, 4, 4 * 3 * 4);
        this.vertexBuffer.configure(2, 2, 4 * 3 * 4 + 4 * 4 * 4);
        this.vertexArray.unbind();
    }

    onUpdateTexture()
    {

    }

    onUpdateColor()
    {
        var data = [];
        for(var i = 0; i < 4; i++)
        {
            data.push(this.color.getRed());
            data.push(this.color.getGreen());
            data.push(this.color.getBlue());
            data.push(this.color.getAlpha());
        }
        this.vertexArray.bind();
        this.vertexBuffer.bind();
        this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 4 * 3 * 4, new Float32Array(data), 0, 0);
    }

    onDraw()
    {
        var renderer = Engine.getInstance().getRenderer();
        var level = Engine.getInstance().getLevel();

        if(this.texture != null) this.texture.bind();
        this.shader.bind();
        this.vertexArray.bind();
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
        
        this.shader.sendBoolData("shape.hasColor", true);
        this.shader.sendBoolData("shape.hasTexture", true);
        
        this.elementBuffer.draw();
        if(this.texture != null) this.texture.unbind();
    }

    onUnload()
    {
        this.elementBuffer.unload();
        this.vertexBuffer.unload();
        this.vertexArray.unload();
    }

}