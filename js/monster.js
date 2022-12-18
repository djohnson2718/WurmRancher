import { DistanceObjects, GetClosestPrey, RandomXonField, RandomYonField } from "./gameControl.js";
import { LaserDestructablePiece } from "./laserDestructablePiece.js";
import { monsterImage } from "./resources.js";
import { RelativeRotateToRadiansPerFrame, RelativeSpeedToPixelsPerFrame, relMonsterRotate, relMonsterSpeed } from "./timing.js";
var height = 50;
var width = 50;
export class Monster extends LaserDestructablePiece {
    constructor() {
        super(height, width, RelativeSpeedToPixelsPerFrame(relMonsterSpeed), RelativeRotateToRadiansPerFrame(relMonsterRotate));
        this.Name = "Monster";
        this.Layer = 5;
        this.PieceImage = monsterImage;
    }
    Update() {
        if (!this.hit) {
            if (this.target_feeder != null) {
                if (this.target_feeder.eaten) {
                    this.target_feeder = null;
                    this.resting = true;
                }
                else {
                    this.SetDestination(this.target_feeder.CenterX, this.target_feeder.CenterY);
                    if (DistanceObjects(this, this.target_feeder) <= this.Width / 2) {
                        this.target_feeder.Eat();
                        //if (theControl.SoundEffectsOn)
                        //    EatSound.Play();
                    }
                }
            }
            if (this.target_feeder == null && this.resting) // find a new destination!
             {
                this.target_feeder = GetClosestPrey(this, false, "Feeder");
                if (this.target_feeder != null) {
                    this.SetDestination(this.target_feeder.CenterX, this.target_feeder.CenterY);
                }
                else
                    this.SetDestination(RandomXonField(), RandomYonField());
            }
        }
        super.Update();
    }
}
//# sourceMappingURL=monster.js.map