const height = 25;
const width = 25;
import { DistanceObjects, PlaySound, SetPreyTarget } from "./gameControl.js";
import { LaserDestructablePiece } from "./laserDestructablePiece.js";
import { parasiteAttachSound, parasiteDieSound, parasiteEatSound, parasiteImage } from "./resources.js";
import { ParasiteRotate, ParasiteSpeed } from "./timing.js";
export class Parasite extends LaserDestructablePiece {
    constructor() {
        super(height, width, ParasiteSpeed, ParasiteRotate);
        this.Layer = 2;
        this.Name = "Parasite";
        this.LaserHitSound = parasiteDieSound;
        this.sightRange = Number.MAX_VALUE;
        this.is_attached = false;
        this.PieceImage = parasiteImage;
    }
    Update(time_step) {
        super.Update(time_step);
        if (!this.hit) {
            if (this.target != null) {
                if (this.is_attached) {
                    this.CenterX = this.target.CenterX;
                    this.CenterY = this.target.CenterY;
                    this.Angle = this.target.angle;
                    this.target.ParasiteBite(time_step);
                    if (this.target.IsEatenByParasite) {
                        PlaySound(parasiteEatSound);
                        this.target = null;
                        this.is_attached = false;
                        this.resting = false; //what is this?    
                    }
                }
                else //is not attached yet
                 {
                    this.SetDestination(this.target.CenterX, this.target.CenterY);
                    if (DistanceObjects(this, this.target) <= this.Width / 3) {
                        this.is_attached = true;
                        this.resting = true;
                        PlaySound(parasiteAttachSound);
                    }
                }
            }
            if ((this.target == null && this.resting)) // find a new destination!
             {
                SetPreyTarget(this, "WurmBody");
            }
        }
    }
    PreyLost() {
        this.target = null;
        this.resting = true;
    }
}
//# sourceMappingURL=parasite.js.map