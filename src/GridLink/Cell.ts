import { Direction } from "../Types";
import { LinkNode } from "./LinkNode";
export class Cell
{
    private _x:number;
    private _y:number;
    private _links:LinkNode<Cell>;
    constructor(x:number,y:number){
        this._x = x;
        this._y = y;
        this._links = new LinkNode<Cell>(4);        
    }
    get X():number{return this._x;}
    get Y():number{return this._y;}
    get Right():Cell{return this._links.GetLink(Direction.Right);}
    get Down():Cell{return this._links.GetLink(Direction.Down);}
    get Left():Cell{return this._links.GetLink(Direction.Left);}
    get Up():Cell{return this._links.GetLink(Direction.Up);}
    get Connections():Array<Cell>{return this._links.Links;}

    public SetDirection(dir:Direction, cell:Cell){
        this._links.SetLink(dir, cell);
    }

    public SetOppositeDirection(dir:Direction, cell:Cell){
        this.SetDirection((dir+2)%4, cell);
    }

    public ClearDirection(dir:Direction){
        this._links.ClearLink(dir);
    }
    
    public GetDirection(dir:Direction): Cell{
        return this._links.GetLink(dir);
    }

    public GetRemainingDirections(){
        return this._links.RemainingLinkIndexList;
    }

    public GetRemainingDirectionCount(){
        return this._links.RemainingLinks;
    }

    get ValidDirections():Array<Direction> {
        let r = [];
        if(this.Right!==null) r.push(Direction.Right);
        if(this.Down!==null) r.push(Direction.Down);
        if(this.Left!==null) r.push(Direction.Left);
        if(this.Up!==null) r.push(Direction.Up);
        return r;
    }

    get State():number{
        let r = 0;
        if(this.Right!==null) r|=1;
        if(this.Down!==null) r|=2;
        if(this.Left!==null) r|=4;
        if(this.Up!==null) r|=8;
        return r;
    }

    public ToString():string{        
        return ("0"+(this.State)).slice(-2);
    }

}