import { Engine } from "./3DEngine/Engine.js";
import { Color } from "./3DEngine/Color.js";
import { Cube } from "./3DEngine/Cube.js";
import { Level } from "./3DEngine/Level.js";
import { Texture } from "./3DEngine/Texture.js";
import { Quad } from "./3DEngine/Quad.js";
import { Model } from "./3DEngine/Model.js";

class TestLevel extends Level
{

    constructor()
    {
        super();
    }

    onLoad() 
    {
        var tex = new Texture("risitas", "./risitas.jpg");
        var sky = new Texture("sky", "./sky.jpg");
        this.addTexture(tex);
        this.addTexture(sky);

        var test4 = new Model("test4", "mp7");
        test4.getScale().setX(0.01);
        test4.getScale().setY(0.01);
        test4.getScale().setZ(0.01);
        test4.getPosition().setX(0.15);
        test4.getPosition().setY(-0.15);
        test4.getPosition().setZ(0.35);
        test4.getRotation().setY(175);
        test4.setColor(Color.GRAY);
        test4.setFollowingCamera(true);
        this.addShape(test4);

        var test3 = new Cube("pipi3");
        test3.setTexture(this.getTexture("sky"));
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
            if(event.key == "d") camera.getPosition().setX(camera.getPosition().getX() + 0.1);
            if(event.key == "q") camera.getPosition().setX(camera.getPosition().getX() - 0.1);
        };
    }

    onUpdate() 
    { 
        var test = this.getShape("pipi");
        var test3 = this.getShape("pipi3");
        var test4 = this.getShape("test4");

        test.getRotation().setY(test.getRotation().getY() + 2.5);
        test3.getRotation().setY(test3.getRotation().getY() + 0.01);
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
window.onload = function()
{
    engine.load();
    engine.run();
}

