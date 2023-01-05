const height = 25;
const width = 25;
import { DistanceObjects, GetClosestPrey, PlaySound, RandomXonField, RandomYonField } from "./gameControl.js";
import { LaserDestructablePiece } from "./laserDestructablePiece.js";
import { parasiteAttachSound, parasiteDieSound, parasiteEatSound, parasiteImage } from "./resources.js";
import { ParasiteRotate, ParasiteSpeed } from "./timing.js";
export class Parasite extends LaserDestructablePiece {
    constructor() {
        super(height, width, ParasiteSpeed, ParasiteRotate);
        this.Layer = 2;
        this.Name = "Parasite";
        this.LaserHitSound = parasiteDieSound;
        this.is_attached = false;
        this.PieceImage = parasiteImage;
    }
    Update(time_step) {
        super.Update(time_step);
        if (!this.hit) {
            if (this.target_wurm_piece != null) {
                if (this.is_attached) {
                    this.CenterX = this.target_wurm_piece.CenterX;
                    this.CenterY = this.target_wurm_piece.CenterY;
                    this.Angle = this.target_wurm_piece.angle;
                    this.target_wurm_piece.ParasiteBite(time_step);
                    if (this.target_wurm_piece.IsEatenByParasite) {
                        PlaySound(parasiteEatSound);
                        this.target_wurm_piece = null;
                        this.is_attached = false;
                        this.resting = false;
                    }
                }
                else {
                    this.SetDestination(this.target_wurm_piece.CenterX, this.target_wurm_piece.CenterY);
                    if (DistanceObjects(this, this.target_wurm_piece) <= this.Width / 3) {
                        if (this.target_wurm_piece.Available(true)) {
                            this.is_attached = true;
                            this.resting = true;
                            PlaySound(parasiteAttachSound);
                        }
                        else {
                            this.target_wurm_piece = null;
                            this.resting = true;
                        }
                    }
                }
            }
            if ((this.target_wurm_piece == null && this.resting)) // find a new destination!
             {
                this.target_wurm_piece = GetClosestPrey(this, true, "WurmBody");
                if (this.target_wurm_piece != null) {
                    this.SetDestination(this.target_wurm_piece.CenterX, this.target_wurm_piece.CenterY);
                }
                else
                    this.SetDestination(RandomXonField(), RandomYonField());
            }
        }
    }
}
//# sourceMappingURL=parasite.js.map