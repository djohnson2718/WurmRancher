import { EdiblePlant } from "./ediblePlant.js";
import { ReportGrassGrow } from "./gameControl.js";
import { plant_size } from "./plant.js";
import { GrassGrowTime } from "./timing.js";
const fullGrownPic = new Image(plant_size, plant_size);
const sprayedPic = new Image(plant_size, plant_size);
const seedPic = new Image(plant_size, plant_size);
fullGrownPic.src = "../Resources/good_grass_new.png";
sprayedPic.src = "../Resources/good_grass_new_sprayed.png";
seedPic.src = "../Resources/seeded.png";
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
}
//# sourceMappingURL=goodGrass.js.map