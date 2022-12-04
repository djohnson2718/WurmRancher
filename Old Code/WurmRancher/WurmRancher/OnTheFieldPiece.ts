import { GameControl } from "./gameControl.js";

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
