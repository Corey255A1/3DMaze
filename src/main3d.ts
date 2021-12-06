import { Maze } from "./Maze";
import { MazeRenderer3d } from "./MazeRenderer3d";
import { Direction } from "./Types";
import { 
    Engine, FreeCamera, 
    Scene, Vector3,
    HemisphericLight, Mesh,
    UniversalCamera,
    StandardMaterial,
    Color3,
    MeshBuilder
 } from "@babylonjs/core";
import { Generator } from "webpack";
 
function main(){
    const cnv = document.getElementById("game") as HTMLCanvasElement;
    cnv.width = 1920;
    cnv.height = 1080;
    const engine = new Engine(cnv);

    let scene = new Scene(engine);

    //float camera
    /*
    var camera = new FreeCamera("camera", new Vector3(25,20,25), scene);
    camera.attachControl(cnv,true);
    camera.setTarget(new Vector3(0,0,0));
    */

    // Parameters : name, position, scene
    var camera = new UniversalCamera("UniversalCamera", new Vector3(1, 1, 1), scene);

    // Targets the camera to a particular position. In this case the scene origin
    camera.setTarget(Vector3.Zero());

    // Attach the camera to the canvas
    camera.speed = 0.5;
    camera.applyGravity = true;
    camera.ellipsoid = new Vector3(.4, .8, .4);
    camera.checkCollisions = true;
    camera.attachControl(cnv, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
    //var sphere = MeshBuilder.CreateSphere("sphere1",{segments:16, diameter:2}, scene)
    // Move the sphere upward 1/2 its height
    //sphere.position.y = 2;

    var material = new StandardMaterial("groundmat", scene);
    material.diffuseColor = new Color3(0,1,0.2);

    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    const groundWidth = 70;
    const groundHeight = 70;
    var ground = MeshBuilder.CreateGround("ground1", {width:groundWidth, height:groundHeight, subdivisions:1}, scene);
    ground.material = material;
    ground.position.x += groundWidth/2-10;
    ground.position.z += groundHeight/2-10;
    ground.checkCollisions = true;

    //camera.setTarget(ground.position);

    const maze = new Maze(10,10);
    maze.Generate();

    const mazerender = new MazeRenderer3d(scene);
    mazerender.DrawMaze(maze);

    // Render every frame
    engine.runRenderLoop(() => {
        scene.render();
    });
};

main();