import { Shape } from "./Shape.js";
import { Color } from "./Color.js";
import { Matrix4f } from "./Matrix4f.js";
import { Vector3f } from "./Vector3f.js";

export class Triangle extends Shape
{
 
    test = 0;

    constructor()
    {
        super(3, 3 * 3 + 3 * 4);
    }

    onLoad()
    {
        var color = new Color();
        var first = new Vector3f(0, 1, 0);
        var second = new Vector3f(-1, -1, 0);
        var third = new Vector3f(1, -1, 0);


        this.vertexBuffer.appendCoordinate(first);
        this.vertexBuffer.appendCoordinate(second);
        this.vertexBuffer.appendCoordinate(third);
        this.vertexBuffer.appendColor(color);
        this.vertexBuffer.appendColor(color);
        this.vertexBuffer.appendColor(color);

        this.vertexArray.load();
        this.vertexBuffer.load();
        
        this.vertexArray.bind();
        this.vertexBuffer.bind();
        this.vertexBuffer.configure(0, 3, 0);
        this.vertexBuffer.configure(1, 4, 3 * 3 * 4);
        this.vertexArray.unbind();
    }

    onDraw()
    {
        this.test += 0.01;
        this.shader.sendMatrix4fData("projectionMatrix", Matrix4f.projectionMatrix(900, 600, 60, 0.1, 1000));
        this.shader.sendMatrix4fData("scaleMatrix", Matrix4f.scaleMatrix(0.2, 0.2, 0.2));
        this.shader.sendMatrix4fData("rotationZMatrix", Matrix4f.rotationZMatrix(this.test));
    }

    onUnload()
    {
        this.vertexArray.unload();
    }

}