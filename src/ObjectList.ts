export class ObjectList<T>{
    private _array:Array<T>
    constructor(){
        this._array = []
    }
    public get Count():number{return this._array.length}
    public get List():Array<T>{
        return this._array;
    }
    public add(obj:T){
        this._array.push(obj);
    }
    public addUnique(obj:T){
        let idx = this._array.indexOf(obj);
        if(idx<0){
            this._array.push(obj);
        }
    }
    public removeFirstOf(obj:T){
        let idx = this._array.indexOf(obj);
        if(idx>=0){
            this._array.splice(idx,1);
        }
    }
}