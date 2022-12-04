import { MovesToDestinationControl } from "./movesToDestinationControl.js";
import * as timing from "./timing.js";
const height = 30;
const width = 30;
const rancherImage = new Image(height, width);
export class Rancher extends MovesToDestinationControl {
    constructor(theControl_) {
        super(theControl_, height, width, timing.RelativeSpeedToPixelsPerFrame(timing.relRancherSpeed), timing.RelativeRotateToRadiansPerFrame(timing.relRancherRotate));
        rancherImage.src = "./Resources/rancher.png";
        this.PieceImage = rancherImage;
        this.x = 100;
        this.y = 100;
    }
}
//# sourceMappingURL=rancher.js.map