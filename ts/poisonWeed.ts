import { EdiblePlant } from "./ediblePlant.js";
import { CurrentLevel, GrowPoisonWeed } from "./gameControl.js";
import { GrassChaser } from "./predPrey.js";
import { poisonWeedImage, poisonWeedSprayedImage } from "./resources.js";

export class PoisonWeed extends EdiblePlant{

    SprayedPic = poisonWeedSprayedImage;
    Name = "PoisonWeed";

    constructor(indexX:number, indexY:number){
        super(indexX,indexY);
        this.PieceImage = poisonWeedImage;

            this.eat_value = -1;
    }

    count = 0;
    Update(time_step:number):void{
        this.count+=time_step;
        if (this.count >= CurrentLevel.WeedGrowthRate && !this.sprayed)
        {
            this.count = 0;
            let r = Math.random();
            if (r<.25)
                GrowPoisonWeed(this.indexX - 1, this.indexY);
            else if (r < .5)
                GrowPoisonWeed(this.indexX + 1, this.indexY);
            else if (r < .75)
                GrowPoisonWeed(this.indexX,  this.indexY-1);
            else
                GrowPoisonWeed(this.indexX, this.indexY+1);
        }
        super.Update(time_step);
    }

    Available(eater : GrassChaser): boolean {
        return (!this.sprayed) && super.Available(eater);
    }
}