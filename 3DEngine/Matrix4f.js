export class Matrix4f
{

    data = [];

    constructor()
    {
        for(var i = 0; i < 4 * 4; i++)
        {
            this.data.push(0);
        }

        this.data[0] = 1; this.data[4] = 0; this.data[8] = 0; this.data[12] = 0;
        this.data[1] = 0; this.data[5] = 1; this.data[9] = 0; this.data[13] = 0;
        this.data[2] = 0; this.data[6] = 0; this.data[10] = 1; this.data[14] = 0;
        this.data[3] = 0; this.data[7] = 0; this.data[11] = 0; this.data[15] = 1;
    }

    static projectionMatrix(width, height, fov, nearZ, farZ)
    {
        var matrix = new Matrix4f();
        var aspectRatio = width / height;
        var radiansFov = this.degreesToRadians(fov / 2);

        matrix.data[0] = 1 / (Math.tan(radiansFov) * aspectRatio);
        matrix.data[5] = 1 / Math.tan(radiansFov);
        matrix.data[10] = ((-nearZ - farZ) / (nearZ - farZ));
        matrix.data[14] = ((2 * farZ * nearZ) / (nearZ - farZ));
        matrix.data[11] = 1;

        return matrix;
    }

    static rotationZMatrix(angle)
    {
        var matrix = new Matrix4f();
        var rad = this.degreesToRadians(angle);

        matrix.data[0] = Math.cos(angle);
        matrix.data[4] = Math.sin(angle);
        matrix.data[1] = -Math.sin(angle);
        matrix.data[5] = Math.cos(angle);

        return matrix;
    }

    static translationMatrix(x, y, z)
    {
        var matrix = new Matrix4f();
        matrix.data[12] = x;
        matrix.data[13] = y;
        matrix.data[14] = z;
        return matrix;
    }

    static scaleMatrix(x, y, z)
    {
        var matrix = new Matrix4f();
        matrix.data[0] = x;
        matrix.data[5] = y;
        matrix.data[10] = z;
        return matrix;
    }

    static degreesToRadians(degrees)
    {
        return degrees * (Math.PI / 180);
    }

    setValue(index, value)
    {
        if(index < 0 || index > 15) throw "Can't set value outside of the matrix";
        this.data[index] = value;
    }

    getValue(index)
    {
        if(index < 0 || index > 15) throw "Can't get value from outside of the matrix";
        return this.data[index];
    }

    getData()
    {
        return this.data;
    }

}