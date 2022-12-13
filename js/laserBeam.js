import { context, RemovePiece } from "./gameControl.js";
import { LaserFadeTime } from "./timing.js";
export class LaserBeam {
    constructor(sourceX, sourceY, targetX, targetY) {
        this.time = 0;
        this.Name = "LaserBeam";
        this.Layer = 1;
        this.targetX = targetX;
        this.targetY = targetY;
        this.sourceX = sourceX;
        this.sourceY = sourceY;
    }
    Update() {
        this.time++;
        if (this.time >= LaserFadeTime) {
            RemovePiece(this);
        }
        context.save();
        context.globalAlpha = (LaserFadeTime - this.time) / LaserFadeTime;
        context.lineWidth = 5;
        context.strokeStyle = '#ff0000';
        context.beginPath();
        context.moveTo(this.sourceX, this.sourceY);
        context.lineTo(this.targetX, this.targetY);
        context.stroke();
        context.restore();
    }
}
//# sourceMappingURL=laserBeam.js.map