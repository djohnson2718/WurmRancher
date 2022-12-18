import { Feeder } from "./feeder.js";
import { DistanceObjects, GetClosestPrey, RandomXonField, RandomYonField } from "./gameControl.js";
import { LaserDestructablePiece } from "./laserDestructablePiece.js";
import { monsterImage } from "./resources.js";
import { RelativeRotateToRadiansPerFrame, RelativeSpeedToPixelsPerFrame, relMonsterRotate, relMonsterSpeed } from "./timing.js";


var height = 50;
var width = 50;


export class Monster extends LaserDestructablePiece{
    Name = "Monster";
    Layer = 5;
    constructor(){
        super(height,width,RelativeSpeedToPixelsPerFrame(relMonsterSpeed), RelativeRotateToRadiansPerFrame(relMonsterRotate));
        this.PieceImage = monsterImage;
    }


    target_feeder : Feeder;
    Update() :void
    {
        if (!this.hit)
        {
            if (this.target_feeder != null)
            {
                if (this.target_feeder.eaten)
                {
                    this.target_feeder = null;
                    this.resting = true;
                }
                else
                {
                    this.SetDestination(this.target_feeder.CenterX, this.target_feeder.CenterY);
                    if (DistanceObjects(this, this.target_feeder) <= this.Width / 2)
                    {
                        this.target_feeder.Eat();
                        //if (theControl.SoundEffectsOn)
                        //    EatSound.Play();
                    }
                }
            }

            if (this.target_feeder == null && this.resting) // find a new destination!
            {
                this.target_feeder = GetClosestPrey(this, false, "Feeder") as Feeder;
                if (this.target_feeder != null)
                {
                    this.SetDestination(this.target_feeder.CenterX, this.target_feeder.CenterY);
                }
                else
                    this.SetDestination(RandomXonField(),RandomYonField());
            }
        }
        super.Update();
    }
}