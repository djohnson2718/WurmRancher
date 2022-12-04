import { context} from "./gameControl.js";
import { GameElement } from "./gameElement.js";
import { OnTheFieldPiece } from "./OnTheFieldPiece.js";


export class ImagePiece extends OnTheFieldPiece implements GameElement {
    PieceImage : HTMLImageElement;

    constructor(height : number, width : number){
        super(height, width);
    }

    Update() : void{
        //console.log("about to draw something.");
        context.drawImage(this.PieceImage,this.x, this.y, this.Width, this.Height);
        //console.log("just tried to draw something.");
    }
}