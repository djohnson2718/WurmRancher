import { DistanceObjects, PlaySound, SetPreyTarget } from "./gameControl.js";
import { LaserDestructablePiece } from "./laserDestructablePiece.js";
import { monsterDieSound, monsterEatSound, monsterImage } from "./resources.js";
import { MonsterRotate, MonsterSpeed } from "./timing.js";
var height = 50;
var width = 50;
export class Monster extends LaserDestructablePiece {
    constructor() {
        super(height, width, MonsterSpeed, MonsterRotate);
        this.Name = "Monster";
        this.Layer = 5;
        this.LaserHitSound = monsterDieSound;
        this.sightRange = Number.MAX_VALUE;
        this.PieceImage = monsterImage;
    }
    Update(time_step) {
        if (!this.hit) {
            if (this.target != null) {
                if (this.target.eaten) {
                    this.target = null;
                    this.resting = true;
                }
                else {
                    this.SetDestination(this.target.CenterX, this.target.CenterY);
                    if (DistanceObjects(this, this.target) <= this.Width / 2) {
                        this.target.Eat();
                        PlaySound(monsterEatSound);
                    }
                }
            }
            if (this.target == null && this.resting) // find a new destination!
             {
                SetPreyTarget(this, "Feeder");
            }
        }
        super.Update(time_step);
    }
    PreyLost() {
        this.target = null;
        this.resting = true;
    }
}
//# sourceMappingURL=monster.js.map