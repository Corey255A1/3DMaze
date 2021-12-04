import { Maze } from "./Maze.js";
import { MazeRenderer } from "./MazeRenderer.js";
import { Direction } from "./Types.js";
function main(){
    const cnv = document.getElementById("game") as HTMLCanvasElement;
    cnv.width = 480;
    cnv.height = 480;
    const ctx = cnv.getContext("2d") as CanvasRenderingContext2D;
    
    ctx.fillStyle = "black"
    ctx.fillRect(0,0,480,480);
    ctx.strokeStyle = "blue";
    ctx.fillStyle = "limegreen";
    ctx.lineWidth = 2;
    // ctx.beginPath();
    // ctx.moveTo(0,0);
    // ctx.lineTo(480,480);
    // ctx.stroke();
    const cellSize = 40;
    const gridSize = cnv.width / cellSize;
    const cellCount = gridSize*gridSize;
    
    const maze = new Maze(gridSize,gridSize);
    const mazeRender = new MazeRenderer(ctx);
    maze.Generate();
    
    let direction = -1;
    let currentCell = maze.getValueXY(0,0);
    const directions:{[key:string]:Direction} = {
        "ArrowRight":Direction.Right,
        "ArrowUp":Direction.Up,
        "ArrowLeft":Direction.Left,
        "ArrowDown":Direction.Down
    }
    window.addEventListener('keydown',(e)=>{
        if(directions[e.code] !== undefined){
            direction = directions[e.code];
        }
    });
    
    window.addEventListener('keyup',(e)=>{
        if(directions[e.code] !== undefined){
            direction = -1;
        }
    });
    
    let startTime = 0;
    function render(currentTime:number){
        ctx.strokeStyle = "blue";
        ctx.fillStyle = "limegreen";
        ctx.lineWidth = 3;
        mazeRender.DrawMaze(maze,cellSize);
    
        ctx.fillStyle = "black";
        if(startTime === 0){
            startTime = currentTime;
        }
        const elapsed = currentTime - startTime;
        if(elapsed > 100){
            startTime = currentTime;
            if(direction!==-1){
                let next = currentCell.getDirection(direction);
                if(next !== undefined){
                    currentCell = next;
                }
            }
        }
        
        ctx.fillRect(2+cellSize*currentCell.X,2+cellSize*currentCell.Y,cellSize*0.6,cellSize*0.6);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();