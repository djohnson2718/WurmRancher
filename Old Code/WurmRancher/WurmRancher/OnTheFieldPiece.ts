export class OnTheFieldPiece {
  CenterX: number;
  CenterY: number;
  //CenterPoint: Point;
  height : number;
  width : number;

  theControl : GameControl;

  constructor(control : GameControl, height: number, width :number ){
    this.height = height;
    this.width = width;
    this.theControl = control;
  }
}
