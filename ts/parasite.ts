const height = 25;
const width = 25;

import { DistanceObjects, PlaySound, RandomXonField, RandomYonField } from "./gameControl.js";
import { LaserDestructablePiece } from "./laserDestructablePiece.js";
import { Predator, PreyI } from "./prey.js";
import { parasiteAttachSound, parasiteDieSound, parasiteEatSound, parasiteImage } from "./resources.js";
import { ParasiteRotate, ParasiteSpeed } from "./timing.js";
import { WurmBodyPiece } from "./wurmPieces.js";

class _Parasite extends LaserDestructablePiece{
    Layer = 2;
    Name = "Parasite";
    LaserHitSound = parasiteDieSound;
    sightRange = Number.MAX_VALUE;
    preyList = ["WurmBody"];
    foodEaten = 0;//not used

    target : PreyI;

    constructor(){
        super(height,width, ParasiteSpeed, ParasiteRotate);
        this.PieceImage = parasiteImage;
    }

    //target_wurm_piece : WurmBodyPiece;
    is_attached = false;

    Update(time_step:number) :void{
        super.Update(time_step);
        if (!this.hit)
        {
            if (this.target != null )
            {
                if (DistanceObjects(this,this.target) < this.Height/3)
                    this.is_attached = true;
                if (this.is_attached)
                {
                    this.CenterX = this.target.CenterX;
                    this.CenterY = this.target.CenterY;

                    this.Angle = this.target.angle;
                }
                
            }
        }
    }
}

export var Parasite = Predator(_Parasite);