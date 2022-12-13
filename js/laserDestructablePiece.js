import { RemovePiece } from "./gameControl.js";
import { LaserHitable } from "./laserHitable.js";
import { CreatureDeathFadeTime } from "./timing.js";
export class LaserDestructablePiece extends LaserHitable {
    constructor() {
        super(...arguments);
        this.fade_time_elapsed = 0;
    }
    Update() {
        if (this.hit) {
            this.fade_time_elapsed++;
            if (this.fade_time_elapsed > CreatureDeathFadeTime)
                RemovePiece(this);
            this.Opacity = (CreatureDeathFadeTime - this.fade_time_elapsed) / CreatureDeathFadeTime;
        }
        super.Update();
    }
}
//# sourceMappingURL=laserDestructablePiece.js.map