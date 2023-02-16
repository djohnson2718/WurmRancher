import { EdiblePlant } from "./ediblePlant.js";
import { DistanceObjects, SetTargetPlant } from "./gameControl.js";
import { LaserDestructablePiece } from "./laserDestructablePiece.js";
import { GrassChaser } from "./predPrey.js";
import { GrassEaterDeathSound, grassEaterImage } from "./resources.js";
import { GrassEaterRotate, GrassEaterSpeed } from "./timing.js";

const height = 30;
const width =30;


export class GrassEater extends LaserDestructablePiece implements GrassChaser{
    Layer = 6;
    Name = "GrassEater";
    hit = false;
    targetPlant :EdiblePlant;

    constructor(){
        super(height,width, GrassEaterSpeed, GrassEaterRotate);
        this.PieceImage = grassEaterImage;
        this.LaserHitSound = GrassEaterDeathSound;
    }

    Update(time_step:number) : void{
        if (this.hit){
            super.Update(time_step);
            return;
        }
        
        if (this.targetPlant && DistanceObjects(this, this.targetPlant) < 1 && !(this.hit))
        {
            this.targetPlant.Eat(time_step);
            if (this.targetPlant.Eaten)
                this.targetPlant = null;
        }

        if (this.targetPlant == null && this.resting) // find a new destination!
            SetTargetPlant(this, ["GoodGrass"]);

        //console.log("about to call super",this);
        super.Update(time_step);
    }
    
    PreyLost(): void {
        if (this.targetPlant){
            this.targetPlant.chaser = null;
            this.targetPlant = null;
        }
        this.resting = true;
    }

    Hit():void{
        this.PreyLost();
    }

}