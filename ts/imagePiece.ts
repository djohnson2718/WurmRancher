import { context} from "./gameControl.js";
import { GameElement } from "./gameElement.js";
import { OnTheFieldPiece } from "./OnTheFieldPiece.js";


export abstract class ImagePiece extends OnTheFieldPiece implements GameElement {
    PieceImage : HTMLImageElement;
    angle : number;
    abstract Layer : number;
    abstract  Name : string;
    Opacity = 1;

    constructor(height : number, width : number, angle :number){
        super(height, width);
        this.angle = angle;
    }

    Update(time_step:number) : void{
        //console.log("about to draw something.", this.PieceImage.src);
        context.save();
        context.globalAlpha = this.Opacity;
        context.translate(this.CenterX,this.CenterY);
        context.rotate(this.angle);
        context.drawImage(this.PieceImage,-this.Height/2, -this.Width/2, this.Width, this.Height);
        context.restore();
        //console.log("drew at", this.CenterX, this.CenterY);
    }

    
}