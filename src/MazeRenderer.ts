class MazeRenderer{
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
        if(cell.Down === undefined) this._ctx.lineTo(sX+size, sY);
        else this._ctx.moveTo(sX+size, sY);
    
        if(cell.Right === undefined) this._ctx.lineTo(sX+size, sY+size);
        else this._ctx.moveTo(sX+size, sY+size);
    
        if(cell.Up === undefined) this._ctx.lineTo(sX, sY+size);
        else this._ctx.moveTo(sX, sY+size);
    
        if(cell.Left === undefined) this._ctx.lineTo(sX, sY);
        //ctx.moveTo(sX, sY);
    
        this._ctx.stroke();
    }

    public DrawMaze(maze:Maze, cellSize:number){
        for(let i=0; i<maze.CellCount; i++){
            const c = maze.getCell(i);
            this.DrawCell(c, cellSize)
        }
    }
}