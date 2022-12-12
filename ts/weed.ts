import { CurrentLevel, GrowWeed } from "./gameControl.js";
import { Plant } from "./plant.js";

var weedPic = new Image();
weedPic.src = "../Resources/weed.png";
var weedSprayedPic = new Image();
weedSprayedPic.src = "../Resources/weedsprayed.png";


export class Weed extends Plant{
    Name = "Weed";
    SprayedPic = weedSprayedPic;

    constructor(indexX:number, indexY:number){
        super(indexX,indexY);
        this.PieceImage = weedPic;
    }

    count :number;

    Update():void{
        this.count++;
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
        super.Update();
    }

}