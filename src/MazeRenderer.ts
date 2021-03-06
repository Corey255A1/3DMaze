import { Maze } from "./Maze";
import { Cell } from "./GridLink/Cell";
export class MazeRenderer{
    private _ctx:CanvasRenderingContext2D;
    constructor(ctx:CanvasRenderingContext2D){
        this._ctx = ctx;
    }

    public DrawCell(cell:Cell, size:number){
        const sX = cell.X*size;
        const sY = cell.Y*size;
        
        this._ctx.fillRect(sX, sY, size, size);
        
        this._ctx.beginPath();
        this._ctx.moveTo(sX, sY);
        if(cell.Up == Maze.WALL) this._ctx.lineTo(sX+size, sY);
        else this._ctx.moveTo(sX+size, sY);
    
        if(cell.Right == Maze.WALL) this._ctx.lineTo(sX+size, sY+size);
        else this._ctx.moveTo(sX+size, sY+size);
    
        if(cell.Down == Maze.WALL) this._ctx.lineTo(sX, sY+size);
        else this._ctx.moveTo(sX, sY+size);
    
        if(cell.Left == Maze.WALL) this._ctx.lineTo(sX, sY);
        //ctx.moveTo(sX, sY);
    
        this._ctx.stroke();
    }

    public DrawMaze(maze:Maze, cellSize:number){
        for(let i=0; i<maze.CellCount; i++){
            const c = maze.GetCellByIndex(i);
            if(c!=undefined){
                this.DrawCell(c, cellSize)
            }
            
        }
    }
}