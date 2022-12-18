import { CurrentLevel, GrowWeed } from "./gameControl.js";
import { Plant } from "./plant.js";
import { weedSprayedPic, weedPic } from "./resources.js";
export class Weed extends Plant {
    constructor(indexX, indexY) {
        super(indexX, indexY);
        this.Name = "Weed";
        this.SprayedPic = weedSprayedPic;
        this.PieceImage = weedPic;
    }
    Update() {
        this.count++;
        if (this.count >= CurrentLevel.WeedGrowthRate && !this.sprayed) {
            this.count = 0;
            let r = Math.random();
            if (r < .25)
                GrowWeed(this.indexX - 1, this.indexY);
            else if (r < .5)
                GrowWeed(this.indexX + 1, this.indexY);
            else if (r < .75)
                GrowWeed(this.indexX, this.indexY - 1);
            else
                GrowWeed(this.indexX, this.indexY + 1);
        }
        super.Update();
    }
}
//# sourceMappingURL=weed.js.map