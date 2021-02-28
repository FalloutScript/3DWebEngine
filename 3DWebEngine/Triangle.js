import { Shape } from "./Shape.js";
import { Matrix4f } from "./Matrix4f.js";
import { Vector3f } from "./Vector3f.js";
import { Engine } from "./Engine.js";

export class Triangle extends Shape
{

    constructor(name)
    {
        super(name, 3, 3 * 3 + 3 * 4);
    }

    onLoad()
    {
        var first = new Vector3f(0, 1, 0);
        var second = new Vector3f(-1, -1, 0);
        var third = new Vector3f(1, -1, 0);

        //Triangle
        this.vertexBuffer.appendCoordinate(first);
        this.vertexBuffer.appendCoordinate(second);
        this.vertexBuffer.appendCoordinate(third);
        
        //Color
        this.vertexBuffer.appendColor(this.color, 3);

        this.vertexArray.load();
        this.vertexBuffer.load();
        
        this.vertexArray.bind();
        this.vertexBuffer.bind();
        this.vertexBuffer.configure(0, 3, 0);
        this.vertexBuffer.configure(1, 4, 3 * 3 * 4);
        this.vertexArray.unbind();
    }
    
    onUpdateColor()
    {
        var data = [];
        for(var i = 0; i < 3; i++)
        {
            data.push(this.color.getRed());
            data.push(this.color.getGreen());
            data.push(this.color.getBlue());
            data.push(this.color.getAlpha());
        }
        this.vertexArray.bind();
        this.vertexBuffer.bind();
        this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 3 * 4 * 3, new Float32Array(data), 0, 0);
        this.vertexArray.unbind();
    }

    onDraw()
    {
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

        this.vertexArray.bind();
        this.vertexBuffer.draw();
        this.vertexArray.unbind();
        if(this.texture != null) this.texture.unbind();
    }

    onUnload()
    {
        this.vertexBuffer.unload();
        this.vertexArray.unload();
    }

}