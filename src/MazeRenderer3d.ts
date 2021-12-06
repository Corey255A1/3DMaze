import { 
    Engine, FreeCamera, 
    Scene, Vector3,
    HemisphericLight, Mesh,
    Material,
    StandardMaterial,
    Color3,
    Axis,
    MeshBuilder
 } from "@babylonjs/core";

 import { Maze } from "./Maze"
 import { Cell } from "./GridLink/Cell"

 export class MazeRenderer3d{
    private _scene:Scene;
    private _size:number;
    private _size_half:number;
    constructor(scene:Scene){
        this._scene = scene;
        this._size=5;
        this._size_half = this._size/2;
    }
    DrawWalls(cell:Cell){
        let cells = []
        if(cell.Up == undefined){
            const up =  MeshBuilder.CreatePlane("plane", {size:this._size}, this._scene);
            //up.position.y += this._size_half;
            up.position.z -= this._size_half;
            cells.push(up);
            up.rotate(Axis.Y, Math.PI);
        }
        
        if(cell.Down == undefined){
            const up =  MeshBuilder.CreatePlane("plane", {size:this._size}, this._scene);
            //up.position.y += this._size_half;
            up.position.z += this._size_half;
            //up.rotate(Axis.Y, Math.PI)
            cells.push(up);
        }

        if(cell.Left == undefined){
            const up =  MeshBuilder.CreatePlane("plane", {size:this._size}, this._scene);
            //up.position.y += this._size_half;
            up.position.x -= this._size_half;
            up.rotate(Axis.Y, -Math.PI/2);
            cells.push(up);
        }
        if(cell.Right == undefined){
            const up =  MeshBuilder.CreatePlane("plane", {size:this._size}, this._scene);
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
        }

    }
    DrawMaze(maze:Maze){
        for(let i=0; i<maze.CellCount; i++){
            const c = maze.getCell(i);
            this.DrawWalls(c);
        }
    }
}