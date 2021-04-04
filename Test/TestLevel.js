import { Engine } from "../3DWebEngine/Engine.js";
import { Color } from "../3DWebEngine/Color.js";
import { Cube } from "../3DWebEngine/Cube.js";
import { Quad } from "../3DWebEngine/Quad.js";
import { Level } from "../3DWebEngine/Level.js";
import { Texture } from "../3DWebEngine/Texture.js";
import { Model } from "../3DWebEngine/Model.js";

export class TestLevel extends Level
{

    constructor()
    {
        super();
    }

    onLoad() 
    {
        //Background color
        Engine.getInstance().getRenderer().setClearColor(Color.BLACK);

        //Textures
        var cubeTexture = new Texture("cubeTexture", "./textures/risitas.jpg");
        var gunTexture = new Texture("gunTexture", "./models/Colt_Python.png");
        var crosshairTexture = new Texture("crosshair_texture","./textures/crosshair.png");
        this.addTexture(cubeTexture);
        this.addTexture(gunTexture);
        this.addTexture(crosshairTexture);

        //Cube
        var cube = new Cube("cube");
        cube.setTexture(cubeTexture);
        cube.setColor(Color.WHITE);
        cube.getScale().setX(0.1);
        cube.getScale().setY(0.1);
        cube.getScale().setZ(0.1);
        cube.getPosition().setZ(2);
        cube.setColor(Color.RED);
        this.addShape(cube);

        //Gun
        var gun = new Model("gun", "models/Colt_Python.obj");
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
		
        //Crosshair
		var crosshair = new Quad("crosshair");
        crosshair.setTexture(this.getTexture("crosshair_texture"));
        crosshair.getScale().setX(0.05);
        crosshair.getScale().setY(0.05);
        crosshair.getScale().setZ(0.05);
        crosshair.getPosition().setZ(1);
        this.addShape(crosshair);
    }

    onUpdate() 
    { 
        var cube = this.getShape("cube");
        cube.getRotation().setY(cube.getRotation().getY() + 0.2);
    }

    onDraw() {}
    onUnload() {}
}