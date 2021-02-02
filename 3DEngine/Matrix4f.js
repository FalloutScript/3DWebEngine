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
        var radiansFov = this.degreesToRadians(fov);

        matrix.data[0] = 1 / (Math.tan(radiansFov / 2) * aspectRatio);
        matrix.data[5] = 1 / Math.tan(radiansFov / 2);
        matrix.data[10] = ((-nearZ - farZ) / (nearZ - farZ));
        matrix.data[14] = ((2 * farZ * nearZ) / (nearZ - farZ));
        matrix.data[11] = 1;
        matrix.data[15] = 0;

        return matrix;
    }

    static rotationXMatrix(angle)
    {
        var matrix = new Matrix4f();
        var rad = this.degreesToRadians(angle);

        matrix.data[5] = Math.cos(rad);
        matrix.data[9] = Math.sin(rad);
        matrix.data[6] = -Math.sin(rad);
        matrix.data[10] = Math.cos(rad);

        return matrix;
    }

    static rotationYMatrix(angle)
    {
        var matrix = new Matrix4f();
        var rad = this.degreesToRadians(angle);

        matrix.data[0] = Math.cos(rad);
        matrix.data[8] = Math.sin(rad);
        matrix.data[2] = -Math.sin(rad);
        matrix.data[10] = Math.cos(rad);

        return matrix;
    }

    static rotationZMatrix(angle)
    {
        var matrix = new Matrix4f();
        var rad = this.degreesToRadians(angle);

        matrix.data[0] = Math.cos(rad);
        matrix.data[4] = Math.sin(rad);
        matrix.data[1] = -Math.sin(rad);
        matrix.data[5] = Math.cos(rad);

        return matrix;
    }

    static translationMatrix(translation)
    {
        var matrix = new Matrix4f();
        matrix.data[12] = translation.getX();
        matrix.data[13] = translation.getY();
        matrix.data[14] = translation.getZ();
        return matrix;
    }

    static viewTranslationMatrix(translation)
    {
        var matrix = new Matrix4f();
        matrix.data[12] = -translation.getX();
        matrix.data[13] = -translation.getY();
        matrix.data[14] = -translation.getZ();
        return matrix;
    }

    static scaleMatrix(scale)
    {
        var matrix = new Matrix4f();
        matrix.data[0] = scale.getX();
        matrix.data[5] = scale.getY();
        matrix.data[10] = scale.getZ();
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