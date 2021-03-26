import { Vector3f } from "./Vector3f.js";

export class Camera
{

    position = null;
    rotation = null;
	sensitivity = 0;

    constructor()
    {
        this.position = new Vector3f(0, 0, 0);
        this.rotation = new Vector3f(0, 0, 0);
		this.sensitivity = 1;
    }
	
	setSensitivity(sensitivity)
	{
		this.sensitivity = sensitivity;
	}
	
	getSensitivity()
	{
		return this.sensitivity;
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