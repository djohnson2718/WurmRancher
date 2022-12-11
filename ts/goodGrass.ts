import { EdiblePlant } from "./ediblePlant.js";
import { ReportGrassGrow } from "./gameControl.js";
import { plant_size } from "./plant.js";
import { GrassGrowTime } from "./timing.js";

const fullGrownPic = new Image(plant_size,plant_size);
const sprayedPic = new Image(plant_size,plant_size);
const seedPic = new Image(plant_size,plant_size);

fullGrownPic.src = "../Resources/good_grass_new.png";
sprayedPic.src = "../Resources/good_grass_new_sprayed.png";
seedPic.src = "../Resources/seeded.png"

export class GoodGrass extends EdiblePlant {
    mature: boolean;
    available: boolean;
    SprayedPic = sprayedPic;
    elapsed_time = 0;

    constructor(indexX:number, indexY:number, starts_mature : boolean = false){
        super(indexX,indexY);
        if (starts_mature)
                this.PieceImage = fullGrownPic;
            else
                this.PieceImage = seedPic;
            this.eat_value = 1;

            this.mature = starts_mature;
    }

    get Available() : boolean {
        console.log(this.mature, this.dibs);
        return this.mature && this.dibs == 0;
    }

    Update():void{
        //console.log("update grass");
        if (!this.mature)
            {
                this.elapsed_time++;
                if (this.elapsed_time >= GrassGrowTime)
                {
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

    get Name(){return "GoodGrass";}
}