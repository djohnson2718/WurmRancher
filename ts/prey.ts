import { Feeder } from "./feeder.js";
import { DistanceObjects } from "./gameControl.js";
import { GameElement } from "./gameElement.js";
import { LaserHitable } from "./laserHitable.js";
import { MovesToDestinationControl } from "./movesToDestinationControl.js";
import { HasCenter, OnTheFieldPiece } from "./OnTheFieldPiece.js";

export interface PreyI extends OnTheFieldPiece{
    Available(care_about_dibs:boolean) : boolean;
}

type Preyable = new (...args: any[]) => MovesToDestinationControl & {Name :string, Layer:number, Eat():number, get Eaten() : boolean};
type Predatorable = new (...args: any[]) => LaserHitable & {Name:string, Layer:number};
//type HasCenterClass = new (...args: any[]) => HasCenter;

interface PredatorI extends MovesToDestinationControl{
    PreyStolen():void;
}

class PredDist{
    predator : PredatorI;
    dist : number;
}

export function Prey(base : Preyable){
    return class Prey_ extends base{
        Available(care_about_dibs: boolean): boolean {
            return true;
        }

        predatorMap : {[name:string] : PredDist } = {};

        CheckToChase(predator : PredatorI){
            let dist = DistanceObjects(this, predator);
            if (this.predatorMap.hasOwnProperty(predator.Name))
                if (dist < this.predatorMap[predator.Name].dist){
                    this.predatorMap[predator.Name].predator.PreyStolen();                
                    this.predatorMap[predator.Name] = {"dist" : dist, "predator" : predator};
                }
            else
                this.predatorMap[predator.Name] = {"dist" : dist, "predator" : predator};
        }

        Update(time_step :number) : void {
            super.Update(time_step);
            this.predatorMap = {}
        };
    }
}

const tol = 1;

export function Predator(base : Predatorable){
    return class Predator_ extends base implements PredatorI{
        PreyStolen() :void{

        }

        target : PreyI;
        Update(time_step: number): void {
            if (this.hit){
                super.Update(time_step);
                return;
            }

            if (this.target != null && DistanceObjects(this,this.target) < tol)
            {
                this.target.Eat();
                if (this.taraget.Eaten)
                    this.target = null;
            }

            if (this.target == null && this.resting)
            {
                //request to chase closest available
            }
            super.Update(time_step);
        }
    }
}

export function GetClosestPrey(to: PredatorI, preyNames : Array<string>) : PreyI{
    let best_dist_so_far = Number.MAX_VALUE;
    let closest : Prey = null;
    let f : Prey  = null;
    let cur_dist : number;
    //console.log("looking for prey");
    for (const e of GameElements)
    {
        //console.log(e, e.Name,e.Name==preyName);
        if (e.Name == preyName)
        {
            f = (e as unknown) as Prey;
            //console.log("available", f.Available(care_about_dibs));
            if (f.Available(care_about_dibs))
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

let FeederP = Prey(Feeder);

let r = new FeederP();

