import { context } from "./gameControl.js";
import { OnTheFieldPiece } from "./OnTheFieldPiece.js";
export class ImagePiece extends OnTheFieldPiece {
    constructor(height, width, angle) {
        super(height, width);
        this.Opacity = 1;
        this.angle = angle;
    }
    Update(time_step) {
        //console.log("about to draw something.", this.PieceImage.src);
        context.save();
        context.globalAlpha = this.Opacity;
        context.translate(this.CenterX, this.CenterY);
        context.rotate(this.angle);
        context.drawImage(this.PieceImage, -this.Height / 2, -this.Width / 2, this.Width, this.Height);
        context.restore();
        //console.log("drew at", this.CenterX, this.CenterY);
    }
}
//# sourceMappingURL=imagePiece.js.map