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
    get Right():Cell{return this._links.getLink(Direction.Right);}
    get Down():Cell{return this._links.getLink(Direction.Down);}
    get Left():Cell{return this._links.getLink(Direction.Left);}
    get Up():Cell{return this._links.getLink(Direction.Up);}

    setDirection(dir:Direction, cell:Cell){
        this._links.setLink(dir, cell);
    }

    setOppositeDirection(dir:Direction, cell:Cell){
        this.setDirection((dir+2)%4, cell);
    }

    clearDirection(dir:Direction){
        this._links.clearLink(dir);
    }
    
    getDirection(dir:Direction): Cell{
        return this._links.getLink(dir);
    }

    getRemainingDirections(){
        return this._links.RemainingLinkIndexList;
    }

    getRemainingDirectionCount(){
        return this._links.RemainingLinks;
    }

    get ActiveConnections():number{
        let r = 0;
        if(this.Right!==null && this.Right!==undefined) r|=1;
        if(this.Down!==null && this.Down!==undefined) r|=2;
        if(this.Left!==null && this.Left!==undefined) r|=4;
        if(this.Up!==null && this.Up!==undefined) r|=8;
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

    toString():string{        
        return ("0"+(this.ActiveConnections)).slice(-2);
    }

}