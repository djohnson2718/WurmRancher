import { context } from "./gameControl.js";
import { OnTheFieldPiece } from "./OnTheFieldPiece.js";
export class ImagePiece extends OnTheFieldPiece {
    constructor(height, width) {
        super(height, width);
    }
    Update() {
        //console.log("about to draw something.");
        context.drawImage(this.PieceImage, this.x, this.y, this.Width, this.Height);
        //console.log("just tried to draw something.");
    }
}
//# sourceMappingURL=imagePiece.js.map