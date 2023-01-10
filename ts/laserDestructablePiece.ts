import { RemovePiece } from "./gameControl.js";
import { LaserHitable } from "./laserHitable.js";
import { CreatureDeathFadeTime } from "./timing.js";

export abstract class LaserDestructablePiece extends LaserHitable {
    
    fade_time_elapsed = 0;

    Update(time_step:number): void {
        if (this.hit)
        {
            this.fade_time_elapsed+=time_step;

            if (this.fade_time_elapsed > CreatureDeathFadeTime)
                RemovePiece(this);

            this.Opacity = Math.max(0,(CreatureDeathFadeTime - this.fade_time_elapsed)/ CreatureDeathFadeTime);
        }
        super.Update(time_step);
    }

}