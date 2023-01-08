import { GameElement } from "./gameElement";

export interface HasCenter extends GameElement{
   get CenterX() : number;
   get CenterY() : number;
}

export abstract class OnTheFieldPiece implements HasCenter{

  //CenterPoint: Point;
  Height : number;
  Width : number;
  x : number;
  y : number;
  abstract Layer: number;
  abstract Name: string;
  abstract Update(time_step: number): void;


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
