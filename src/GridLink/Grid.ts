class Grid{
    protected _width:number;
    protected _height:number;
    private _grid:Array<Array<Cell>>;
    private _default:(x:number, y:number)=>Cell;
    constructor(width:number,height:number,cellGenerator:(x:number, y:number)=>Cell){
        this._width = width;
        this._height = height;
        this._default = cellGenerator;
        this._grid = this.buildGrid(this._width, this._height);
    }

    public get CellCount():number{return this._height * this._width;}

    public buildGrid(w:number, h:number):Array<Array<Cell>>
    {
        let grid = new Array<Array<Cell>>();
        for(let y=0; y<h; y++)
        {
            let row = new Array<Cell>();
            for(let x=0; x<w; x++)
            {
                row.push(this._default(x,y));
            }
            grid.push(row);
        }
        return grid;
    }
    checkBoundsXY(x:number,y:number):boolean{
        return (x >= 0 && y>=0 && x<this._width && y<this._height);
    }
    checkBounds(v:Point2D):boolean{
        return this.checkBoundsXY(v.X, v.Y);
    }
    getValueXY(x:number,y:number):any{
        if(this.checkBoundsXY(x,y)) return this._grid[y][x];
        else return undefined;
    }
    getValue(v:Point2D):any{
        return this.getValueXY(v.X,v.Y);
    }
    setValue(x:number,y:number,v:Cell){
        if(this.checkBoundsXY(x,y)) this._grid[y][x]=v;
    }
    toString():string{
        let str = ""
        for(let y=0; y<this._height; y++)
        {
            for(let x=0; x<this._width; x++)
            {
                str += this._grid[y][x].toString() + " ";
            }
            str += "\n";
        }
        return str;
    }
    getCell(idx:number):Cell{
        let y = Math.floor(idx/this._width);
        let x = idx - y*this._width;
        return this._grid[y][x];
    }
}