import { Shape } from "./Shape.js";

export class Triangle extends Shape
{
    constructor()
    {
        super(3, 3*3 + 3*4);
    }

    onLoad()
    {
        this.appendCoordinate(0, 1, 0);
        this.appendCoordinate(-1, -1, 0);
        this.appendCoordinate(1, -1, 0);

        this.appendColor(this.color.getRed(), this.color.getGreen(), this.color.getBlue(), this.color.getAlpha());
        this.appendColor(this.color.getRed(), this.color.getGreen(), this.color.getBlue(), this.color.getAlpha());
        this.appendColor(this.color.getRed(), this.color.getGreen(), this.color.getBlue(), this.color.getAlpha());

        this.createBuffer();
        this.bindBuffer();
        this.configureBuffer(0, 3, 0);
        this.configureBuffer(1, 4, 3 * 3 * 4);
        this.sendBuffer();
        this.unbindBuffer();
    }

    onDraw()
    {
        this.drawBuffer();
    }

    onUnload()
    {
        this.destroyBuffer();
    }

}