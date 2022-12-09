import { GameElement } from "../gameElement.js";
import { OnTheFieldPiece } from "../OnTheFieldPiece.js";
import { context } from "../gameControl.js";

export class AreaEffectCircle extends OnTheFieldPiece implements GameElement{
    radius : number;
    visible : boolean;
    constructor(radius:number){
        super(radius*2, radius*2);
        this.radius=radius;
        this.visible = false;
    }

    Update():void{
        if (this.visible){
            console.log("drawing circle", this.CenterX, this.CenterY);
            context.beginPath();
            context.arc(this.CenterX,this.CenterY,this.radius,0,2*Math.PI);
            context.stroke();
        }
    }
}