export class Color
{

    red = 1;
    green = 1;
    blue = 1;
    alpha = 1;

    static BLACK = new Color(0, 0, 0, 1);
    static WHITE = new Color(1, 1, 1, 1);
    static GRAY = new Color(0.5, 0.5, 0.5, 1);
    static RED = new Color(1, 0, 0, 1);
    static GREEN = new Color(0, 1, 0, 1);
    static BLUE = new Color(0, 0, 1, 1);
    static YELLOW = new Color(1, 1, 0, 1);

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