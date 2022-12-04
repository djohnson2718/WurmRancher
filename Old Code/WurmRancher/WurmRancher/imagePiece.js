import { OnTheFieldPiece } from "./OnTheFieldPiece.js";
export class ImagePiece extends OnTheFieldPiece {
    constructor(theControl_, height, width) {
        super(theControl_, height, width);
    }
    Update() {
        this.theControl.context.drawImage(this.PieceImage, this.x, this.x, this.Width, this.Height);
        console.log("just tried to draw something.");
    }
}
//# sourceMappingURL=imagePiece.js.map