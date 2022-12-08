import { OnTheFieldPiece } from "./OnTheFieldPiece.js";
import { context } from "./gameControl.js";
export class AreaEffectCircle extends OnTheFieldPiece {
    constructor(radius) {
        super(radius * 2, radius * 2);
        this.radius = radius;
    }
    Update() {
        context.arc(this.CenterX, this.CenterY, this.radius, 0, 2 * Math.PI);
    }
}
//# sourceMappingURL=areaEffectCircle.js.map