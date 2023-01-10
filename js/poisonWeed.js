import { EdiblePlant } from "./ediblePlant.js";
import { CurrentLevel, GrowPoisonWeed } from "./gameControl.js";
import { poisonWeedImage, poisonWeedSprayedImage } from "./resources.js";
export class PoisonWeed extends EdiblePlant {
    constructor(indexX, indexY) {
        super(indexX, indexY);
        this.SprayedPic = poisonWeedSprayedImage;
        this.Name = "PoisonWeed";
        this.count = 0;
        this.PieceImage = poisonWeedImage;
        this.eat_value = -1;
    }
    Update(time_step) {
        this.count += time_step;
        if (this.count >= CurrentLevel.WeedGrowthRate && !this.sprayed) {
            this.count = 0;
            let r = Math.random();
            if (r < .25)
                GrowPoisonWeed(this.indexX - 1, this.indexY);
            else if (r < .5)
                GrowPoisonWeed(this.indexX + 1, this.indexY);
            else if (r < .75)
                GrowPoisonWeed(this.indexX, this.indexY - 1);
            else
                GrowPoisonWeed(this.indexX, this.indexY + 1);
        }
        super.Update(time_step);
    }
    get Available() {
        return (!this.sprayed);
    }
}
//# sourceMappingURL=poisonWeed.js.map