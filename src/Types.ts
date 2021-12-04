export enum Direction {
    Up = 0,
    Right,
    Down,
    Left,
}

export class Point2D{
    public X:number;
    public Y:number;
    constructor(x:number,y:number){this.X = x; this.Y = y;}
}