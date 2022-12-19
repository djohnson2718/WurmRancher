import { CurrentLevel, GrowWeed } from "./gameControl.js";
import { Plant } from "./plant.js";
import { weedSprayedPic, weedPic } from "./resources.js";




export class Weed extends Plant{
    Name = "Weed";
    SprayedPic = weedSprayedPic;

    constructor(indexX:number, indexY:number){
        super(indexX,indexY);
        this.PieceImage = weedPic;
    }

    count :number;

    Update(time_step:number):void{
        this.count+=time_step;
        if (this.count >= CurrentLevel.WeedGrowthRate && !this.sprayed)
        {
            this.count = 0;
            let r = Math.random();
            if (r<.25)
                GrowWeed(this.indexX - 1, this.indexY);
            else if (r < .5)
                GrowWeed(this.indexX + 1, this.indexY);
            else if (r < .75)
                GrowWeed(this.indexX,  this.indexY-1);
            else
                GrowWeed(this.indexX, this.indexY+1);
        }
        super.Update(time_step);
    }

}