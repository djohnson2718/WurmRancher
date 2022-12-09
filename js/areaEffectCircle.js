import { OnTheFieldPiece } from "../OnTheFieldPiece.js";
import { context } from "../gameControl.js";
export class AreaEffectCircle extends OnTheFieldPiece {
    constructor(radius) {
        super(radius * 2, radius * 2);
        this.radius = radius;
        this.visible = false;
    }
    Update() {
        if (this.visible) {
            console.log("drawing circle", this.CenterX, this.CenterY);
            context.beginPath();
            context.arc(this.CenterX, this.CenterY, this.radius, 0, 2 * Math.PI);
            context.stroke();
        }
    }
}
//# sourceMappingURL=areaEffectCircle.js.map