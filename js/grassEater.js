import { DistanceObjects, GetClosestPlant, RandomXonField, RandomYonField } from "./gameControl.js";
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
        if (this.target_plant != null && DistanceObjects(this, this.target_plant) < 1 && !(this.hit)) {
            this.target_plant.Eat(time_step);
            if (this.target_plant.Eaten)
                this.target_plant = null;
        }
        if (this.target_plant == null && this.resting) // find a new destination!
         {
            this.target_plant = GetClosestPlant(this, ["GoodGrass"]);
            if (this.target_plant != null) {
                this.SetDestination(this.target_plant.CenterX, this.target_plant.CenterY);
                this.target_plant.Dibs(777);
            }
            else
                this.SetDestination(RandomXonField(), RandomYonField());
        }
        super.Update(time_step);
    }
}
//# sourceMappingURL=grassEater.js.map