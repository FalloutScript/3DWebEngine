export class Color
{

    red = 1;
    green = 1;
    blue = 1;
    alpha = 1;

    constructor(red, green, blue, alpha)
    {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }

    getRed()
    {
        return this.red;
    }

    getGreen()
    {
        return this.green;
    }

    getBlue()
    {
        return this.blue;
    }

    getAlpha()
    {
        return this.alpha;
    }

}