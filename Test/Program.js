import { Engine } from "../3DWebEngine/Engine.js";
import { Color } from "../3DWebEngine/Color.js";
import { Cube } from "../3DWebEngine/Cube.js";
import { Quad } from "../3DWebEngine/Quad.js";
import { Level } from "../3DWebEngine/Level.js";
import { Texture } from "../3DWebEngine/Texture.js";
import { Model } from "../3DWebEngine/Model.js";

class TestLevel extends Level
{

    constructor()
    {
        super();
    }

    onLoad() 
    {
		this.addTexture(new Texture("crosshair_texture","./crosshair.png"));
        Engine.getInstance().getRenderer().setClearColor(0.6, 0.6, 1);

        var cubeTexture = new Texture("cubeTexture", "./risitas.jpg");
        var gunTexture = new Texture("gunTexture", "./Colt_Python.png");
        this.addTexture(cubeTexture);
        this.addTexture(gunTexture);

        var cube = new Cube("cube");
        cube.setTexture(cubeTexture);
        cube.setColor(Color.WHITE);
        cube.getScale().setX(0.1);
        cube.getScale().setY(0.1);
        cube.getScale().setZ(0.1);
        cube.getPosition().setZ(1);
        cube.setColor(Color.RED);
        this.addShape(cube);

        var gun = new Model("gun", "Colt_Python.obj");
        gun.setTexture(gunTexture);
        gun.setColor(Color.WHITE);
        gun.getScale().setX(0.01);
        gun.getScale().setY(0.01);
        gun.getScale().setZ(0.01);
        gun.getPosition().setX(0.15);
        gun.getPosition().setY(-0.15);
        gun.getPosition().setZ(0.45);
        gun.getRotation().setY(180);
        gun.setFollowingCamera(true);
        this.addShape(gun);

        var engine = Engine.getInstance();
        var camera = this.getCamera();
        var initializationEvent = false;
        var oldX = 0;
        var oldY = 0;
		
		var crosshair = new Quad("crosshair");
        crosshair.setTexture(this.getTexture("crosshair_texture"));
        this.addShape(crosshair);
        
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
                var x = (event.clientX - oldX);
                camera.getRotation().setY(camera.getRotation().getY() - x * (100 / engine.getMaxFramesPerSecond()));
                oldX = event.clientX;
            } else if(oldX > event.clientX) {
                var x = (oldX - event.clientX);
                camera.getRotation().setY(camera.getRotation().getY() + x * (100 / engine.getMaxFramesPerSecond()));
                oldX = event.clientX;
            }

            if(oldY < event.clientY)
            {
                var y = (event.clientY - oldY);
                camera.getRotation().setX(camera.getRotation().getX() + y * (100 / engine.getMaxFramesPerSecond()));
                oldY = event.clientY;
            } else if(oldY > event.clientY) {
                var y = (oldY - event.clientY);
                camera.getRotation().setX(camera.getRotation().getX() - y * (100 / engine.getMaxFramesPerSecond()));
                oldY = event.clientY;
            }
        };
    }

    onUpdate() 
    { 
        var cube = this.getShape("cube");
        cube.getRotation().setY(cube.getRotation().getY() + 0.2);
    }

    onDraw() {}
    onUnload() {}
}

class TestEngine extends Engine
{

    constructor(level)
    {
        super(level);
    }

    onLoad() {}
    onUpdate() {}
    onUnload() {}
}

var level = new TestLevel();
var engine = new TestEngine(level);
window.onload = function()
{
    engine.load();
    engine.run();
}

