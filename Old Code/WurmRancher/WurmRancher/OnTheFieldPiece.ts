export class OnTheFieldPiece {

  //CenterPoint: Point;
  Height : number;
  Width : number;
  x : number;
  y : number;

  theControl : GameControl;

  constructor(control : GameControl, height: number, width :number ){
    this.Height = height;
    this.Width = width;
    this.theControl = control;
  }

  Remove():void{
    //todo 
  }

  get CenterX() :number {
    return self.x + this.Width/2;
  }

  get Centery() : number{
    return self.y + this.Height/2;
  }
}
