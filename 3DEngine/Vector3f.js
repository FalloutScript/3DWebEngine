export class Vector3f
{

    x = 0;
    y = 0;
    z = 0;

    constructor(x = 0, y = 0, z = 0)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    setX(x)
    {
        this.x = x;
    }

    setY(y)
    {
        this.y = y;
    }

    setZ(z)
    {  
        this.z = z;
    }

    getX()
    {
        return this.x;
    }

    getY()
    {
        return this.y;
    }

    getZ()
    {
        return this.z;
    }

}