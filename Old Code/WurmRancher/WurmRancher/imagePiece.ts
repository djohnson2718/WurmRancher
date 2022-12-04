import { GameControl } from "./gameControl.js";
import { GameElement } from "./gameElement.js";
import { OnTheFieldPiece } from "./OnTheFieldPiece.js";

export class ImagePiece extends OnTheFieldPiece implements GameElement {
    PieceImage : HTMLImageElement;

    constructor(theControl_ : GameControl, height : number, width : number){
        super(theControl_, height, width);
    }

    Update() : void{
        this.theControl.context.drawImage(this.PieceImage,this.x, this.x, this.Width, this.Height);
        console.log("just tried to draw something.");
    }
}