const height = 25;
const width = 25;
import { DistanceObjects } from "./gameControl.js";
import { LaserDestructablePiece } from "./laserDestructablePiece.js";
import { Predator } from "./prey.js";
import { parasiteDieSound, parasiteImage } from "./resources.js";
import { ParasiteRotate, ParasiteSpeed } from "./timing.js";
class _Parasite extends LaserDestructablePiece {
    constructor() {
        super(height, width, ParasiteSpeed, ParasiteRotate);
        this.Layer = 2;
        this.Name = "Parasite";
        this.LaserHitSound = parasiteDieSound;
        this.sightRange = Number.MAX_VALUE;
        this.preyList = ["WurmBody"];
        this.foodEaten = 0; //not used
        //target_wurm_piece : WurmBodyPiece;
        this.is_attached = false;
        this.PieceImage = parasiteImage;
    }
    Update(time_step) {
        super.Update(time_step);
        if (!this.hit) {
            if (this.target != null) {
                if (DistanceObjects(this, this.target) < this.Height / 3)
                    this.is_attached = true;
                if (this.is_attached) {
                    this.CenterX = this.target.CenterX;
                    this.CenterY = this.target.CenterY;
                    this.Angle = this.target.angle;
                }
            }
        }
    }
}
export var Parasite = Predator(_Parasite);
//# sourceMappingURL=parasite.js.map