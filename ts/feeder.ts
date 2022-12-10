import { EdiblePlant } from "./ediblePlant.js";
import { MovesToDestinationControl } from "./movesToDestinationControl.js";
import { RelativeRotateToRadiansPerFrame, RelativeSpeedToPixelsPerFrame, relFeederRotate, relFeederSpeed } from "./timing.js";
import { DistanceObjects, GetClosestEdiblePlant, RandomXonField, RandomYonField } from "./gameControl.js";

const height =30;
const width = 30;
const max_vision = 200;
const max_size = 10;

const feederPic = new Image(height,width);
feederPic.src = "../Resources/feeder.png";

export class Feeder extends MovesToDestinationControl //implements Prey
{
    eaten: boolean;
    size: number;
    feederSize: number;
    dibs: number;

    target_plant : EdiblePlant;

    constructor (){
        super(height,width, RelativeSpeedToPixelsPerFrame(relFeederSpeed), RelativeRotateToRadiansPerFrame(relFeederRotate));
        this.PieceImage = feederPic;
        this.target_plant = null;
    }
    Dibs() :void{
        this.dibs = 10;
    }

    Update():void{
        super.Update();
        if (this.dibs >0)
                this.dibs--;
            if (this.target_plant != null && DistanceObjects(this, this.target_plant) < 1)
            {
                let eats = this.target_plant.Eat();
                if (eats != 0)
                {
                    this.size += eats;
                    //if (EatsGrass != null)
                    //    EatsGrass(this, new GameEventArgs(theControl));
                    
                }
                if (this.size > max_size)
                    this.size = max_size;
                if (this.size < 0)
                    this.size = 0;

                if (this.target_plant.Eaten)
                    this.target_plant = null;
            }

            if (this.target_plant == null && this.resting) // find a new destination!
            {
                this.target_plant = GetClosestEdiblePlant(this);
                if (this.target_plant != null && DistanceObjects(this.target_plant, this) > max_vision)
                    this.target_plant = null;

                if (this.target_plant != null)
                {
                    this.SetDestination(this.target_plant.CenterX, this.target_plant.CenterY);
                    this.target_plant.Dibs(10);
                }
                else
                    this.SetDestination(RandomXonField(),RandomYonField());
            }

    }

}