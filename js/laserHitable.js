import { MovesToDestinationControl } from "./movesToDestinationControl.js";
export class LaserHitable extends MovesToDestinationControl {
    constructor() {
        super(...arguments);
        this.hit = false;
    }
    CheckLaserHit(x, y) {
        console.log("in check laser hit");
        if (!this.hit && (x >= this.x && (x - this.x) <= this.Width) && y >= this.y && (y - this.y) < this.Height) {
            //Play die sound
            console.log("it was a hit!");
            this.hit = true;
            //report shot event
        }
    }
}
//# sourceMappingURL=laserHitable.js.map