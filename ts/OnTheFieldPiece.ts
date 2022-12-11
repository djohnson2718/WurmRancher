
export abstract class OnTheFieldPiece {

  //CenterPoint: Point;
  Height : number;
  Width : number;
  x : number;
  y : number;



  constructor(height: number, width :number ){
    this.Height = height;
    this.Width = width;
  }

  Remove():void{
    //todo 
  }

  get CenterX() :number {
    return this.x + this.Width/2;
  }

  set CenterX(value) {
    this.x = value - this.Width/2;
  }

  get CenterY() : number{
    return this.y + this.Height/2;
  }

  set CenterY(value) {
    this.y = value - this.Height/2;
  }

  
}
