import { Engine } from "./3DEngine/Engine.js";
import { Color } from "./3DEngine/Color.js";
import { Cube } from "./3DEngine/Cube.js";
import { Level } from "./3DEngine/Level.js";
import { Texture } from "./3DEngine/Texture.js";
import { Quad } from "./3DEngine/Quad.js";

class TestLevel extends Level
{

    constructor()
    {
        super();
    }

    onLoad() 
    {
        var tex = new Texture("risitas", "./risitas.jpg");
        var skybox = new Texture("skybox", "./sky.jpg");
        console.log(skybox);
        this.addTexture(tex);
        this.addTexture(skybox);

        var test3 = new Cube("pipi3");
        test3.setTexture(this.getTexture("skybox"));
        test3.setColor(Color.WHITE);
        test3.getScale().setX(100);
        test3.getScale().setY(100);
        test3.getScale().setZ(100);
        this.addShape(test3);

        var test = new Cube("pipi");
        test.setTexture(this.getTexture("risitas"));
        test.setColor(Color.WHITE);
        test.getScale().setX(0.1);
        test.getScale().setY(0.1);
        test.getScale().setZ(0.1);
        test.getPosition().setZ(2);
        this.addShape(test);

        var test2 = new Quad("pipi2");
        test2.setTexture(this.getTexture("risitas"));
        test2.getRotation().setY(90);
        test2.getScale().setX(0.1);
        test2.getScale().setY(0.1);
        test2.getScale().setZ(0.1);
        test2.getPosition().setX(1);
        test2.getPosition().setZ(1);
        this.addShape(test2);

        var engine = Engine.getInstance();
        var camera = this.getCamera();
        var initializationEvent = false;
        var oldX = 0;
        var oldY = 0;
        
        document.onmousemove = function mouseEvent(event)
        {
            if(initializationEvent == false)
            {
                oldX = event.clientX;
                oldY = event.clientY;
                initializationEvent = true;
            }

            if(oldX < event.clientX)
            {
                var x = (event.clientX - oldX) / 10;
                camera.getRotation().setY(camera.getRotation().getY() - x * (100 / engine.getMaxFramesPerSecond()));
                oldX = event.clientX;
            } else if(oldX > event.clientX) {
                var x = (oldX - event.clientX) / 10;
                camera.getRotation().setY(camera.getRotation().getY() + x * (100 / engine.getMaxFramesPerSecond()));
                oldX = event.clientX;
            }

            if(oldY < event.clientY)
            {
                var y = (event.clientY - oldY) / 10;
                camera.getRotation().setX(camera.getRotation().getX() + y * (100 / engine.getMaxFramesPerSecond()));
                oldY = event.clientY;
            } else if(oldY > event.clientY) {
                var y = (oldY - event.clientY) / 10;
                camera.getRotation().setX(camera.getRotation().getX() - y * (100 / engine.getMaxFramesPerSecond()));
                oldY = event.clientY;
            }
        };

        document.onkeypress = function keyEvent(event)
        {
            if(event.key == "a") camera.getPosition().setY(camera.getPosition().getY() - 0.1);
            if(event.key == "e") camera.getPosition().setY(camera.getPosition().getY() + 0.1);
            if(event.key == "z") camera.getPosition().setZ(camera.getPosition().getZ() + 0.1);
            if(event.key == "s") camera.getPosition().setZ(camera.getPosition().getZ() - 0.1);
        };
    }

    onUpdate() 
    { 
        var test = this.getShape("pipi");
        test.getRotation().setY(test.getRotation().getY() + 2.5);
    }

    onDraw() 
    { 

    }

    onUnload() 
    { 

    }
}

class TestEngine extends Engine
{

    constructor(level)
    {
        super(level);
    }

    onLoad()
    {

    }

    onUpdate()
    {

    }

    onUnload()
    {

    }
}

var level = new TestLevel();
var engine = new TestEngine(level);
engine.load();
window.onload = engine.run();

