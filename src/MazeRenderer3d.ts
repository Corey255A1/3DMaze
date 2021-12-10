//  import { Engine } from "@babylonjs/core/Engines";
//  import { FreeCamera } from "@babylonjs/core/Cameras";
 import { StandardMaterial, Texture } from "@babylonjs/core/Materials";
 import { Scene } from "@babylonjs/core/scene";
 import { Mesh, MeshBuilder } from "@babylonjs/core/Meshes";
//  import { HemisphericLight} from "@babylonjs/core/Lights";
import { Vector3, Axis } from "@babylonjs/core/Maths";

 import { Maze } from "./Maze"
 import { Cell } from "./GridLink/Cell"

 export class MazeRenderer3d{
    private _scene:Scene;
    private _size:number;
    private _size_half:number;
    private _wallMaterial:StandardMaterial;
    constructor(scene:Scene){
        this._scene = scene;
        this._size=5;
        this._size_half = this._size/2;
        this._wallMaterial = new StandardMaterial("walltexture",scene);
        this._wallMaterial.diffuseTexture = new Texture("assets/imgs/bricks.png",scene); 
    }
    DrawWalls(cell:Cell):Mesh|null{
        let cells = []
        if(cell.Up == undefined){
            //const up =  MeshBuilder.CreatePlane("plane", {size:this._size}, this._scene);
            const up = MeshBuilder.CreateBox("plane",{width:this._size, height:this._size, depth:0.5});
            up.material = this._wallMaterial;
            //up.position.y += this._size_half;
            up.position.z -= this._size_half;
            cells.push(up);
            up.rotate(Axis.Y, Math.PI);
        }
        
        if(cell.Down == undefined){
            //const up =  MeshBuilder.CreatePlane("plane", {size:this._size}, this._scene);
            const up = MeshBuilder.CreateBox("plane",{width:this._size, height:this._size, depth:0.5});
            up.material = this._wallMaterial;
            //up.position.y += this._size_half;
            up.position.z += this._size_half;
            //up.rotate(Axis.Y, Math.PI)
            cells.push(up);
        }

        if(cell.Left == undefined){
            //const up =  MeshBuilder.CreatePlane("plane", {size:this._size}, this._scene);
            const up = MeshBuilder.CreateBox("plane",{width:this._size, height:this._size, depth:0.5});
            up.material = this._wallMaterial;
            //up.position.y += this._size_half;
            up.position.x -= this._size_half;
            up.rotate(Axis.Y, -Math.PI/2);
            cells.push(up);
        }
        if(cell.Right == undefined){
            //const up =  MeshBuilder.CreatePlane("plane", {size:this._size}, this._scene);
            const up = MeshBuilder.CreateBox("plane",{width:this._size, height:this._size, depth:0.5});
            up.material = this._wallMaterial;
            //up.position.y += this._size_half;
            up.position.x += this._size_half;
            up.rotate(Axis.Y, Math.PI/2);
            cells.push(up);
        }

        const box = Mesh.MergeMeshes(cells, true);
        if(box!=null){
          box.position.y += this._size_half;
          box.position.x = cell.X * this._size;
          box.position.z = cell.Y * this._size;
          box.checkCollisions = true;
        }

        return box;

    }
    DrawMaze(maze:Maze):Array<Mesh>{
        const walls:Array<Mesh> = [];
        for(let i=0; i<maze.CellCount; i++){
            const c = maze.getCell(i);
            const w = this.DrawWalls(c);
            if(w!=null){
                walls.push(w);
            }
        }
        return walls;
    }
}