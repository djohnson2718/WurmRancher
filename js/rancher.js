import { MovesToDestinationControl } from "./movesToDestinationControl.js";
import { rancherImage } from "./resources.js";
import * as timing from "./timing.js";
const height = 30;
const width = 30;
export class Rancher extends MovesToDestinationControl {
    constructor() {
        super(height, width, timing.RelativeSpeedToPixelsPerFrame(timing.relRancherSpeed), timing.RelativeRotateToRadiansPerFrame(timing.relRancherRotate));
        this.Layer = 0;
        this.PieceImage = rancherImage;
        this.x = 100;
        this.y = 100;
    }
    get Name() { return "Rancher"; }
}
//# sourceMappingURL=rancher.js.map