import { Feeder } from "./feeder.js";
import { DistanceObjects, GameElements, RandomXonField, RandomYonField } from "./gameControl.js";
import { GameElement } from "./gameElement.js";
import { ImagePiece } from "./imagePiece.js";
import { LaserHitable } from "./laserHitable.js";
import { MovesToDestinationControl } from "./movesToDestinationControl.js";
import { HasCenter, OnTheFieldPiece } from "./OnTheFieldPiece.js";

export interface PreyI extends ImagePiece{
    Available(cpredator:PredatorI) : boolean;
    Eat() :number;
    get Eaten() : boolean;
    DeclareChase(predator:PredatorI):boolean;
    PredatorDied(predator:PredatorI):boolean;
}

type Preyable = new (...args: any[]) => MovesToDestinationControl & {Name :string, Layer:number};
type Predatorable = new (...args: any[]) => LaserHitable & {Name:string, Layer:number, sightRange : number, preyList : Array<string>, foodEaten : number};
//type HasCenterClass = new (...args: any[]) => HasCenter;

interface PredatorI extends MovesToDestinationControl  {
    PreyStolen():void;
    preyList : Array<string>;
    sightRange : number;
}

class PredDist{
    predator : PredatorI;
    dist : number;
}

const dibsValue = 333;
const stealRatio = 0.9;

export function Prey(base : Preyable){
    return class Prey_ extends base{

        currentlyChasing : {[name:string] : PredatorI } = {};
        //dibsMap : {[name:string] : number} = {};

        Available(predator : PredatorI):boolean{
            let dist = DistanceObjects(this, predator);
            if (dist > predator.sightRange)
                return false;

            return (!(this.currentlyChasing.hasOwnProperty(predator.Name)) || dist < stealRatio*DistanceObjects(this, this.currentlyChasing[predator.Name]) );
        }

        DelcareChase(predator : PredatorI){
            if (this.currentlyChasing.hasOwnProperty(predator.Name))
                this.currentlyChasing[predator.Name].PreyStolen();
            this.currentlyChasing[predator.Name] = predator;
        }

        PredatorDied(predator : PredatorI){
            if (this.currentlyChasing.hasOwnProperty(predator.Name) && this.currentlyChasing[predator.Name] == predator)
                delete this.currentlyChasing[predator.Name];
        }

    }
}

const tol = 1;

export function Predator(base : Predatorable){
    return class Predator_ extends base implements PredatorI{
        PreyStolen() :void{
            this.target = null;
            this.resting = true;
        }

        target : PreyI;
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
                let closest : PreyI = null;
                let f : PreyI  = null;
                let cur_dist : number;

                for (const e of GameElements)
                {
                    if (e.Name in this.preyList)
                    {
                        f = (e as unknown) as PreyI;

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

            super.Update(time_step);
        }
    

        Shot():void{
            if (this.target){
                this.target.PredatorDied(this);
                this.target = null;
            }
        }
    }
}

export function GetClosestPrey(to: PredatorI) : PreyI{
    let best_dist_so_far = Number.MAX_VALUE;
    let closest : PreyI = null;
    let f : PreyI  = null;
    let cur_dist : number;
    //console.log("looking for prey");
    for (const e of GameElements)
    {
        //console.log(e, e.Name,e.Name==preyName);
        if (e.Name in to.preyList)
        {
            f = (e as unknown) as PreyI;
            //console.log("available", f.Available(care_about_dibs));
            if (f.Available(to))
            {
                //console.log("available!")
                cur_dist = DistanceObjects(f, to);
                if (cur_dist < best_dist_so_far)
                {
                    //console.log("new best");
                    closest = f;
                    best_dist_so_far = cur_dist;
                }
            }
        }
    }
    //console.log("found",closest);
    return closest;
}

