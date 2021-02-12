import { Vector3f } from "./Vector3f.js";

export class Camera
{

    position = null;
    rotation = null;

    constructor()
    {
        this.position = new Vector3f(0, 0, 0);
        this.rotation = new Vector3f(0, 0, 0);
    }

    getPosition()
    {
        return this.position;
    }

    getRotation()
    {
        return this.rotation;
    }

};