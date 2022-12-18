import { DistanceObjects, GetClosestPlant, RandomXonField, RandomYonField } from "./gameControl.js";
import { LaserDestructablePiece } from "./laserDestructablePiece.js";
import { grassEaterImage, gruntzSound } from "./resources.js";
import { RelativeRotateToRadiansPerFrame, RelativeSpeedToPixelsPerFrame, relGrassEaterRotate, relGrassEaterSpeed } from "./timing.js";
const height = 30;
const width = 30;
export class GrassEater extends LaserDestructablePiece {
    constructor() {
        super(height, width, RelativeSpeedToPixelsPerFrame(relGrassEaterSpeed), RelativeRotateToRadiansPerFrame(relGrassEaterRotate));
        this.Layer = 6;
        this.Name = "GrassEater";
        this.hit = false;
        this.target_plant = null;
        this.PieceImage = grassEaterImage;
        this.LaserHitSound = gruntzSound;
    }
    Update() {
        if (this.hit) {
            super.Update();
            return;
        }
        if (this.target_plant != null && DistanceObjects(this, this.target_plant) < 1 && !(this.hit)) {
            this.target_plant.Eat();
            if (this.target_plant.Eaten)
                this.target_plant = null;
        }
        if (this.target_plant == null && this.resting) // find a new destination!
         {
            this.target_plant = GetClosestPlant(this, ["GoodGrass"]);
            if (this.target_plant != null) {
                this.SetDestination(this.target_plant.CenterX, this.target_plant.CenterY);
                this.target_plant.Dibs(10);
            }
            else
                this.SetDestination(RandomXonField(), RandomYonField());
        }
        super.Update();
    }
}
//# sourceMappingURL=grassEater.js.map