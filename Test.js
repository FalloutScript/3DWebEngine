import { Engine } from "./3DEngine/Engine.js";
import { Triangle } from "./3DEngine/Triangle.js";
import { Color } from "./3DEngine/Color.js";

class TestEngine extends Engine
{

    constructor()
    {
        super();
        this.test = new Triangle();
    }

    onLoad()
    {
        this.test.load();
        this.test.setColor(Color.YELLOW);
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

