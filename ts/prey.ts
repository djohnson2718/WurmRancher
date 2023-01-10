import { Feeder } from "./feeder.js";
import { DistanceObjects } from "./gameControl.js";
import { GameElement } from "./gameElement.js";
import { MovesToDestinationControl } from "./movesToDestinationControl.js";
import { HasCenter, OnTheFieldPiece } from "./OnTheFieldPiece.js";

export interface PreyI extends OnTheFieldPiece{
    Available(care_about_dibs:boolean) : boolean;
}

type MovesToDestinationControlClass = new (...args: any[]) => MovesToDestinationControl & {Name :string, Layer:number};

//type HasCenterClass = new (...args: any[]) => HasCenter;

interface PredatorI extends MovesToDestinationControl{
    PreyStolen():void;
}

class PredDist{
    predator : PredatorI;
    dist : number;
}

export function Prey(base : MovesToDestinationControlClass){
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

export function Predator(base : MovesToDestinationControlClass){
    return class Predator_ extends base implements PredatorI{
        PreyStolen() :void{

        }
    }
}


let FeederP = Prey(Feeder);

let r = new FeederP();

