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
        this.target_plant = null;
        this.PieceImage = grassEaterImage;
        this.LaserHitSound = GrassEaterDeathSound;
    }
    Update(time_step) {
        if (this.hit) {
            super.Update(time_step);
            return;
        }
        if (this.targetPlant !== null)
            console.log(this.targetPlant, DistanceObjects(this, this.target_plant), this.hit);
        if (this.target_plant !== null && DistanceObjects(this, this.target_plant) < 1 && !(this.hit)) {
            this.target_plant.Eat(time_step);
            console.log("took a bite", this.targetPlant.bites_taken);
            if (this.target_plant.Eaten)
                this.target_plant = null;
        }
        if (this.target_plant == null && this.resting) // find a new destination!
            SetTargetPlant(this, ["GoodGrass"]);
        //console.log("about to call super",this);
        super.Update(time_step);
    }
    PreyLost() {
        this.target_plant = null;
        this.resting = true;
    }
}
//# sourceMappingURL=grassEater.js.map