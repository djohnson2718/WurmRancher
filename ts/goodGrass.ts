import { EdiblePlant } from "./ediblePlant.js";
import { ReportGrassGrow } from "./gameControl.js";
import { GrassChaser } from "./predPrey.js";
import { sprayedPic, fullGrownPic, seedPic } from "./resources.js";
import { GrassGrowTime } from "./timing.js";



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

    Available(eater:GrassChaser) : boolean {
        //console.log(this.mature, this.dibs);
        return this.mature && super.Available(eater);// && this.dibs == 0;
    }

    Update(time_step:number):void{
        //console.log("update grass");
        if (!this.mature)
            {
                this.elapsed_time+= time_step;
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
            super.Update(time_step);   
    }

    get Name(){return "GoodGrass";}

    Spray(): void {
        if (this.mature)
            super.Spray();
    }
}