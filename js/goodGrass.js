import { EdiblePlant } from "./ediblePlant.js";
import { ReportGrassGrow } from "./gameControl.js";
import { sprayedPic, fullGrownPic, seedPic } from "./resources.js";
import { GrassGrowTime } from "./timing.js";
export class GoodGrass extends EdiblePlant {
    constructor(indexX, indexY, starts_mature = false) {
        super(indexX, indexY);
        this.SprayedPic = sprayedPic;
        this.elapsed_time = 0;
        if (starts_mature)
            this.PieceImage = fullGrownPic;
        else
            this.PieceImage = seedPic;
        this.eat_value = 1;
        this.mature = starts_mature;
    }
    get Available() {
        console.log(this.mature, this.dibs);
        return this.mature && this.dibs == 0;
    }
    Update() {
        //console.log("update grass");
        if (!this.mature) {
            this.elapsed_time++;
            if (this.elapsed_time >= GrassGrowTime) {
                this.mature = true;
                if (!this.sprayed)
                    this.PieceImage = fullGrownPic;
                else
                    this.PieceImage = sprayedPic;
                ReportGrassGrow(this);
            }
        }
        super.Update();
    }
    get Name() { return "GoodGrass"; }
}
//# sourceMappingURL=goodGrass.js.map