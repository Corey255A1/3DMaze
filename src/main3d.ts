import { Maze } from "./Maze";
import { MazeRenderer3d } from "./MazeRenderer3d";
//import { Direction } from "./Types";

import { Engine, WebXRExperienceHelper } from "@babylonjs/core";
import { UniversalCamera } from "@babylonjs/core/Cameras";
import { StandardMaterial } from "@babylonjs/core/Materials";
import { Scene } from "@babylonjs/core/scene";
import { MeshBuilder } from "@babylonjs/core/Meshes";
import { HemisphericLight} from "@babylonjs/core/Lights";
import { Vector3, Axis, Color3 } from "@babylonjs/core/Maths";
import { Direction } from "./Types";
async function main(){
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

    // Attach the camera to the canvas
    camera.speed = 0.5;
    camera.applyGravity = true;
    camera.ellipsoid = new Vector3(1.2, 1, 1.2);
    camera.checkCollisions = true;
    camera.inputs.
    camera.attachControl(cnv, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    //figure out better lights ...
    //var spotlight = new SpotLight("spotlight", new Vector3(15,15,0), new Vector3(35,0,35), 0, 1, scene);
    //var dirlight = new DirectionalLight("DirectionalLight", new Vector3(0, 0, 0), scene);
    //dirlight.position = new Vector3(15,15,0);

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

    const xr = await scene.createDefaultXRExperienceAsync({
        floorMeshes:[ground]
    });

    // try {
    //     const xrHelper = await WebXRExperienceHelper.CreateAsync(scene);
    // } catch (e) {
    //     // no XR support
    // }

    //camera.setTarget(ground.position);

    const maze = new Maze(10,10);
    const start = maze.GetCellByXY(0,0);
    if(start == undefined){
        return;
    }
    maze.Generate();

    const mazerender = new MazeRenderer3d(maze, 5, scene);
    const mazepieces = mazerender.GenerateMeshes();
    
    camera.position = mazerender.WorldPoint(start);

    let lookat = mazerender.GetPointInDirection(start, start.ValidDirections[0]);

    camera.setTarget(lookat);

    
    //const fullmaze = Mesh.MergeMeshes(mazepieces, true);
    //if(fullmaze!=null) fullmaze.checkCollisions = true;

    // Render every frame
    engine.runRenderLoop(() => {
        scene.render();
    });
};

main();