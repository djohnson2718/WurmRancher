import { DistanceObjects, PlaySound, RemovePlant } from "./gameControl.js";
import { ImagePiece } from "./imagePiece.js";
import { OnTheFieldPiece } from "./OnTheFieldPiece.js";
import { Plant } from "./plant.js";
import { apple_crunchSound } from "./resources.js";
import { EatGrassTime } from "./timing.js";
import { GrassChaser } from "./predPrey.js";

const stealRatio = 0.9;

export abstract class EdiblePlant extends Plant {

    //eaten: boolean;
    eat_value : number;

    bites_taken : number=0;

    dibs : number=0;

    //eaten = false;

    Eat(time_step:number):number{
        this.dibs = 166;
        if (this.Eaten)
            return 0;
        this.bites_taken+=time_step;
        //console.log("eating", this.bites_taken);
        if (this.bites_taken >= EatGrassTime){
            RemovePlant(this);
            PlaySound(apple_crunchSound);
            return this.eat_value;
        }
        return 0;
    }

    get Eaten() : boolean{
        return this.bites_taken >= EatGrassTime;
    }

    Update(time_step:number) :void{
        if (this.dibs>0){
            this.dibs = Math.max(0, this.dibs-time_step);
        }
        super.Update(time_step);
        
    }

    chaser : GrassChaser;

    Available(eater : GrassChaser) :boolean{
        if (this.chaser)
            return (DistanceObjects(this,eater) < stealRatio * DistanceObjects(this, this.chaser))
        else
            return true;
    }

    DeclareChase(eater:GrassChaser):void{
        if (this.chaser){
            this.chaser.PreyLost();
            this.chaser=null;
        }
        this.chaser = eater;
    }
}