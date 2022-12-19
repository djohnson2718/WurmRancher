import { DistanceObjects, GetClosestPlant, RandomXonField, RandomYonField } from "./gameControl.js";
import { GoodGrass } from "./goodGrass.js";
import { LaserDestructablePiece } from "./laserDestructablePiece.js";
import { grassEaterImage, gruntzSound } from "./resources.js";
import { GrassEaterRotate, GrassEaterSpeed } from "./timing.js";

const height = 30;
const width =30;


export class GrassEater extends LaserDestructablePiece{
    Layer = 6;
    Name = "GrassEater";
    hit = false;

    constructor(){
        super(height,width, GrassEaterSpeed, GrassEaterRotate);
        this.PieceImage = grassEaterImage;
        this.LaserHitSound = gruntzSound;
    }

    target_plant : GoodGrass = null;

    Update(time_step:number) : void{
        if (this.hit){
            super.Update(time_step);
            return;
        }
        
        if (this.target_plant != null && DistanceObjects(this, this.target_plant) < 1 && !(this.hit))
            {
                this.target_plant.Eat(time_step);
                if (this.target_plant.Eaten)
                    this.target_plant = null;
            }

            if (this.target_plant == null && this.resting) // find a new destination!
            {
                this.target_plant = (GetClosestPlant(this,["GoodGrass"]) as GoodGrass);
                if (this.target_plant != null)
                {
                    this.SetDestination(this.target_plant.CenterX, this.target_plant.CenterY);
                    this.target_plant.Dibs(332);
                }
                else
                    this.SetDestination(RandomXonField(),RandomYonField());
            }
            super.Update(time_step);
    }
    
}