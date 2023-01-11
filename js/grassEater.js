import { DistanceObjects, SetTargetPlant } from "./gameControl.js";
import { LaserDestructablePiece } from "./laserDestructablePiece.js";
import { GrassEaterDeathSound, grassEaterImage } from "./resources.js";
import { GrassEaterRotate, GrassEaterSpeed } from "./timing.js";
const height = 30;
const width = 30;
export class GrassEater extends LaserDestructablePiece {
    constructor() {
        super(height, width, GrassEaterSpeed, GrassEaterRotate);
        this.Layer = 6;
        this.Name = "GrassEater";
        this.hit = false;
        this.PieceImage = grassEaterImage;
        this.LaserHitSound = GrassEaterDeathSound;
    }
    Update(time_step) {
        if (this.hit) {
            super.Update(time_step);
            return;
        }
        if (this.targetPlant && DistanceObjects(this, this.targetPlant) < 1 && !(this.hit)) {
            this.targetPlant.Eat(time_step);
            if (this.targetPlant.Eaten)
                this.targetPlant = null;
        }
        if (this.targetPlant == null && this.resting) // find a new destination!
            SetTargetPlant(this, ["GoodGrass"]);
        //console.log("about to call super",this);
        super.Update(time_step);
    }
    PreyLost() {
        console.log("prey lost");
        this.targetPlant = null;
        this.resting = true;
    }
    Hit() {
        if (this.targetPlant)
            this.targetPlant.chaser = null;
    }
}
//# sourceMappingURL=grassEater.js.map