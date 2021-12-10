import { Direction, Point2D } from "./Types";
import { Grid } from "./GridLink/Grid";
import { Cell } from "./GridLink/Cell";
export class Maze extends Grid{
    static WALL:Cell = new Cell(-1,-1);
    private _directionBias:number;
    constructor(width:number, height:number){
        super(width, height, (x,y)=>{return new Cell(x,y)});
        //80% chance to maintain current direction
        this._directionBias = 0.8;
    }
    private nextDirection(d:Direction){
            //choose a direction to head
            let changeDirection = (Math.random() > this._directionBias);
            let newDir:Direction = d;
            if(changeDirection){
                //choose a direction that is not the same or reverse
                let offset = Math.round(Math.random()) * 3;
                newDir = (newDir+offset)%4;
            }
            return newDir;
    }
    private directionToPoint2D(d:Direction): Point2D{
        switch(d){
            case Direction.Right: return new Point2D(1, 0);
            case Direction.Up: return new Point2D(0, -1);
            case Direction.Left: return new Point2D(-1, 0);
            case Direction.Down: return new Point2D(0, 1);
            default: return new Point2D(0, 0);
        }
    }

    private nextCell(x:number,y:number,d:Direction){
        let v = this.directionToPoint2D(d);
        v.X += x;
        v.Y += y;
        return this.GetCellByPoint(v);
    }

    public Generate(){
        const startX = 0;
        const startY = 0;
        const endX = this._width-1;
        const endY = this._height-1;
        let curCell = this.GetCellByXY(startX,startY);
        if(curCell != undefined){
            let pathStack = [curCell];
            let direction = 0;
            let state = "FORWARD";
            let x = 0;
            while(state != "DONE" && x<75000){
                switch(state){
                    case "FORWARD":{
                        let potentialDirections = curCell.GetRemainingDirections();
                        let directionIdxMax = potentialDirections.length-1;
                        if(directionIdxMax === -1){ 
                            state = "BACKWARD";
                            break; 
                        }
                        let directionIdx = Math.round(Math.random()*directionIdxMax);
                        direction = potentialDirections[directionIdx];
                        let next = this.nextCell(curCell.X, curCell.Y, direction);
                        if(next!=undefined && next.State === 0){
                            curCell.SetDirection(direction, next);
                            next.SetOppositeDirection(direction, curCell);
                            curCell = next;
                            pathStack.push(curCell);
                            
                        }else{
                            curCell.SetDirection(direction, Maze.WALL);
                        }
                    }break;
                    case "BACKWARD":{
                        if(pathStack.length>0){
                            let prev = pathStack.pop();
                            if(prev != undefined && prev.GetRemainingDirectionCount()>0)
                            {
                                curCell = prev;
                                pathStack.push(prev);
                                state = "FORWARD";
                            }
                        }else{
                            state = "DONE"; 
                        }
                    }break;
                }
                x++;
            }
        }
    }

}