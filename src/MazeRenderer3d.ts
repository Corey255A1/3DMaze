//  import { Engine } from "@babylonjs/core/Engines";
//  import { FreeCamera } from "@babylonjs/core/Cameras";
 import { StandardMaterial, Texture } from "@babylonjs/core/Materials";
 import { Scene } from "@babylonjs/core/scene";
 import { Mesh, MeshBuilder } from "@babylonjs/core/Meshes";
//  import { HemisphericLight} from "@babylonjs/core/Lights";
import { Vector3, Axis } from "@babylonjs/core/Maths";

 import { Maze } from "./Maze";
 import { Cell } from "./GridLink/Cell";
 import { Direction } from "./Types";

 export class MazeRenderer3d{
    private _scene:Scene;
    private _size:number;
    private _size_half:number;
    private _wallMaterial:StandardMaterial;
    private _maze:Maze;
    constructor(maze:Maze, size:number, scene:Scene){
        this._scene = scene;
        this._maze = maze;
        this._size=size;
        this._size_half = this._size/2;
        this._wallMaterial = new StandardMaterial("walltexture",scene);
        this._wallMaterial.diffuseTexture = new Texture("assets/imgs/bricks.png",scene); 
    }
    public DrawWalls(cell:Cell):Mesh|null{
        let cells = []
        if(cell.Up == Maze.WALL){
            //const up =  MeshBuilder.CreatePlane("plane", {size:this._size}, this._scene);
            const up = MeshBuilder.CreateBox("plane",{width:this._size, height:this._size, depth:0.5});
            up.material = this._wallMaterial;
            //up.position.y += this._size_half;
            up.position.z -= this._size_half;
            cells.push(up);
            up.rotate(Axis.Y, Math.PI);
        }
        
        if(cell.Down == Maze.WALL){
            //const up =  MeshBuilder.CreatePlane("plane", {size:this._size}, this._scene);
            const up = MeshBuilder.CreateBox("plane",{width:this._size, height:this._size, depth:0.5});
            up.material = this._wallMaterial;
            //up.position.y += this._size_half;
            up.position.z += this._size_half;
            //up.rotate(Axis.Y, Math.PI)
            cells.push(up);
        }

        if(cell.Left == Maze.WALL){
            //const up =  MeshBuilder.CreatePlane("plane", {size:this._size}, this._scene);
            const up = MeshBuilder.CreateBox("plane",{width:this._size, height:this._size, depth:0.5});
            up.material = this._wallMaterial;
            //up.position.y += this._size_half;
            up.position.x -= this._size_half;
            up.rotate(Axis.Y, -Math.PI/2);
            cells.push(up);
        }
        if(cell.Right == Maze.WALL){
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
    public GenerateMeshes():Array<Mesh>{
        const walls:Array<Mesh> = [];
        for(let i=0; i<this._maze.CellCount; i++){
            const c = this._maze.GetCellByIndex(i);
            if(c!=undefined){
                const w = this.DrawWalls(c);
                if(w!=null){
                    walls.push(w);
                }
            }

        }
        return walls;
    }
    public WorldPoint(cell:Cell):Vector3
    {
        return new Vector3(cell.X, 0.5, cell.Y).scale(this._size)
    }
    public GetPointInDirection(cell:Cell, direction:Direction):Vector3{
        switch(direction){
            case Direction.Up: return ((new Vector3(cell.X, 0.5, cell.Y-1)).scale(this._size));
            case Direction.Down: return ((new Vector3(cell.X, 0.5, cell.Y+1)).scale(this._size));
            case Direction.Left: return ((new Vector3(cell.X-1, 0.5, cell.Y)).scale(this._size));
            case Direction.Right: return ((new Vector3(cell.X+1, 0.5, cell.Y)).scale(this._size));
        }
        
    }
}