import { ObjectList } from "../ObjectList";
export class LinkNode<T>
{
    private _max_count:number;
    private _used:number;
    private _links:Array<any>;
    private _unusedLinks:ObjectList<number>;
    constructor(link_count:number){
        this._links = new Array<any>(link_count);
        this._unusedLinks = new ObjectList<number>();
        this._max_count = link_count;
        this._used = 0;
        this.ClearAll();
    }

    public get LinksUsed():number{return this._used;}
    public get LinksRemaining():number{return this._max_count - this._used;}
    public get RemainingLinkIndexList():Array<number>{return this._unusedLinks.List;}
    public get RemainingLinks():number{return this._unusedLinks.Count;}
    public get Links(){ return this._links; }
    public GetLink(idx:number):T{
        return this._links[idx];
    }

    public SetLink(idx:number, value:T){
        if(idx < this._max_count){
            if((this._links[idx] !== value)){
                if(value !== null){
                    this._used += 1;
                    this._links[idx] = value;
                    this._unusedLinks.removeFirstOf(idx);
                }       
            }
        }
    }

    public ClearAll(){
        for(let i=0; i<this._max_count; i++)
        {
            this._links[i] = null;
            this._unusedLinks.addUnique(i);
        }
        
    }

    public ClearLink(idx:number){
        if(this._links[idx] !== null){
            this._used += 1;
            this._links[idx] = null;
            this._unusedLinks.addUnique(idx);
        }       
    }
}