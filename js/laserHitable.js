import { PlaySound } from "./gameControl.js";
import { MovesToDestinationControl } from "./movesToDestinationControl.js";
export class LaserHitable extends MovesToDestinationControl {
    constructor() {
        super(...arguments);
        this.hit = false;
    }
    Destroyed() { }
    CheckLaserHit(x, y) {
        console.log("in check laser hit", x, y);
        if (!this.hit && (x >= this.x && (x - this.x) <= this.Width) && y >= this.y && (y - this.y) < this.Height) {
            if (this.LaserHitSound)
                PlaySound(this.LaserHitSound);
            console.log("it was a hit!");
            this.hit = true;
            this.Shot();
            return true;
        }
        else
            return false;
    }
    Shot() { }
    ;
}
//# sourceMappingURL=laserHitable.js.map