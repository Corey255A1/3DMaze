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
        this.clearAll();
    }

    public get LinksUsed():number{return this._used;}
    public get LinksRemaining():number{return this._max_count - this._used;}
    public get RemainingLinkIndexList():Array<number>{return this._unusedLinks.List;}
    public get RemainingLinks():number{return this._unusedLinks.Count;}
    public getLink(idx:number):T{
        return this._links[idx];
    }

    public setLink(idx:number, value:T){
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

    public clearAll(){
        for(let i=0; i<this._max_count; i++)
        {
            this._links[i] = null;
            this._unusedLinks.addUnique(i);
        }
        
    }

    public clearLink(idx:number){
        if(this._links[idx] !== null){
            this._used += 1;
            this._links[idx] = null;
            this._unusedLinks.addUnique(idx);
        }       
    }
}