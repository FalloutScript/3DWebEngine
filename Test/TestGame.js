import { Engine } from "../3DWebEngine/Engine.js";

export class TestGame extends Engine
{

    constructor(level)
    {
        super(level);
    }

    onLoad() 
    {
        this.getRenderer().getCanvas().width = window.innerWidth;
        this.getRenderer().getCanvas().height = window.innerHeight;
    }

    onUpdate() {}
    onUnload() {}
}
