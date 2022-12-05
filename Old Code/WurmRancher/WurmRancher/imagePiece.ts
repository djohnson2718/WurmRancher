import { context} from "./gameControl.js";
import { GameElement } from "./gameElement.js";
import { OnTheFieldPiece } from "./OnTheFieldPiece.js";


export class ImagePiece extends OnTheFieldPiece implements GameElement {
    PieceImage : HTMLImageElement;
    angle : number;

    constructor(height : number, width : number, angle :number){
        super(height, width);
        this.angle = angle;
    }

    Update() : void{
        //console.log("about to draw something.");
        context.save();
        context.translate(this.CenterX,this.CenterY);
        context.rotate(this.angle);
        context.drawImage(this.PieceImage,-this.Height/2, this.Width/2, this.Width, this.Height);
        context.restore();
        //console.log("just tried to draw something.");
    }
}