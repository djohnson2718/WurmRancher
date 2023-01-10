import { uptime } from "process";
import { Feeder } from "./feeder.js";
import { DistanceObjects, GameElements, RandomXonField, RandomYonField } from "./gameControl.js";
import { GameElement } from "./gameElement.js";
import { ImagePiece } from "./imagePiece.js";
import { LaserHitable } from "./laserHitable.js";
import { MovesToDestinationControl } from "./movesToDestinationControl.js";
import { HasCenter, OnTheFieldPiece } from "./OnTheFieldPiece.js";

export interface Prey extends ImagePiece{
    Available(cpredator:Predator) : boolean;
    Eat(time_step:number) :number;
    get Eaten() : boolean;
    DeclareChase(predator:Predator):boolean;
    PredatorDied(predator:Predator):boolean;
}

export interface Predator extends MovesToDestinationControl  {
    PreyStolen():void;
    preyList : Array<string>;
    sightRange : number;
}

const dibsValue = 333;
const stealRatio = 0.9;

export const PreyImp ={
    currentlyChasing : {} ,

    Available(predator : Predator):boolean{
        let dist = DistanceObjects(this, predator);
        if (dist > predator.sightRange)
            return false;

        return (!(this.currentlyChasing.hasOwnProperty(predator.Name)) || dist < stealRatio*DistanceObjects(this, this.currentlyChasing[predator.Name]) );
    },

    DelcareChase(predator : Predator){
        if (this.currentlyChasing.hasOwnProperty(predator.Name))
            this.currentlyChasing[predator.Name].PreyStolen();
        this.currentlyChasing[predator.Name] = predator;
        this.zzzz();
    },

    PredatorDied(predator : Predator){
        if (this.currentlyChasing.hasOwnProperty(predator.Name) && this.currentlyChasing[predator.Name] == predator)
            delete this.currentlyChasing[predator.Name];
    }

}


const tol = 10;


export const PredatorImp ={
    PreyStolen() :void{
        this.target = null;
        this.resting = true;
    }, 

    target : null,
    Update(time_step: number): void {
        if (this.hit){
            super.Update(time_step);
            return;
        }

        if (this.target){
            if (this.target.Eaten)
                this.target = null;
            else {
                this.SetDestination(this.target.CenterX, this.target.CenterY);
                if (this.target != null && DistanceObjects(this,this.target) < tol)
                {
                    this.foodEaten += this.target.Eat();
                }
            }
        }

        if (this.target == null && this.resting)
        {
            //find new prey
            let best_dist_so_far = Number.MAX_VALUE;
            let closest : Prey = null;
            let f : Prey  = null;
            let cur_dist : number;

            for (const e of GameElements)
            {
                if (e.Name in this.preyList)
                {
                    f = (e as unknown) as Prey;

                    if (f.Available(this))
                    {
                        cur_dist = DistanceObjects(f, this); //redundant calculation
                        if (cur_dist < best_dist_so_far)
                        {
                            closest = f;
                            best_dist_so_far = cur_dist;
                        }
                    }
                }
            }

            if (f){
                f.DeclareChase(this);
                this.target = f;
            }
            else
                this.SetDestination(RandomXonField(),RandomYonField());
        }

        console.log(this);
        console.log(super.Update);
        super.Update(time_step);
    },


    Shot():void{
        if (this.target){
            this.target.PredatorDied(this);
            this.target = null;
        }
    }
}
