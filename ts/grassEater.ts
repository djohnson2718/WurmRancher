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

    target_plant : EdiblePlant = null;

    Update(time_step:number) : void{
        if (this.hit){
            super.Update(time_step);
            return;
        }
        
        if (this.targetPlant !== null)
            console.log(this.targetPlant,DistanceObjects(this, this.target_plant), this.hit );
        if (this.target_plant !== null && DistanceObjects(this, this.target_plant) < 1 && !(this.hit))
        {
            this.target_plant.Eat(time_step);
            console.log("took a bite", this.targetPlant.bites_taken);
            if (this.target_plant.Eaten)
                this.target_plant = null;
        }

        if (this.target_plant == null && this.resting) // find a new destination!
            SetTargetPlant(this, ["GoodGrass"]);

        //console.log("about to call super",this);
        super.Update(time_step);
    }
    
    PreyLost(): void {
        this.target_plant = null;
        this.resting = true;
    }
}