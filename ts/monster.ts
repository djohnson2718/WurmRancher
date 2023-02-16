import { Feeder } from "./feeder.js";
import { DistanceObjects, PlaySound, RandomXonField, RandomYonField, SetPreyTarget } from "./gameControl.js";
import { LaserDestructablePiece } from "./laserDestructablePiece.js";
import { Predator } from "./predPrey.js";
import { monsterDieSound, monsterEatSound, monsterImage } from "./resources.js";
import { MonsterRotate, MonsterSpeed } from "./timing.js";


var height = 50;
var width = 50;


export class Monster extends LaserDestructablePiece implements Predator{
    Name = "Monster";
    Layer = 5;
    LaserHitSound = monsterDieSound;
    constructor(){
        super(height,width,MonsterSpeed, MonsterRotate);
        this.PieceImage = monsterImage;
    }


    target : Feeder;
    sightRange = Number.MAX_VALUE;

    Update(time_step:number) :void
    {
        if (!this.hit)
        {
            if (this.target != null)
            {
                if (this.target.eaten)
                {
                    this.target = null;
                    this.resting = true;
                }
                else
                {
                    this.SetDestination(this.target.CenterX, this.target.CenterY);
                    
                    if (DistanceObjects(this, this.target) <= this.Width / 2)
                    {
                        this.target.Eat();
                        PlaySound(monsterEatSound);
                    }
                }
            }

            if (this.target == null && this.resting) // find a new destination!
            {
                SetPreyTarget(this,"Feeder");
                    
            }
        }
        super.Update(time_step);
    }

    PreyLost():void{
        if (this.target){
            this.target.chaser = null;
            this.target = null;
        }
        this.resting = true;
    }

    Hit(): void {
        this.PreyLost();
    }
}