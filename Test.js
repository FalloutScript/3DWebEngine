import { Engine } from "./3DEngine/Engine.js";
import { Triangle } from "./3DEngine/Triangle.js";

import { Matrix4f } from "./3DEngine/Matrix4f.js";

class TestEngine extends Engine
{

    constructor()
    {
        super();
        this.test = new Triangle();
        console.log(document.documentElement.clientWidth);
    }

    onLoad()
    {
        this.test.load();
    }

    onUpdate()
    {
        this.test.draw();
    }

    onUnload()
    {
        this.test.unload();
    }
}

var engine = new TestEngine();
engine.load();
window.onload = engine.update();

