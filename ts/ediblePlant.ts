import { PlaySound, RemovePlant } from "./gameControl.js";
import { Plant } from "./plant.js";
import { apple_crunchSound } from "./resources.js";
import { EatGrassTime } from "./timing.js";

export abstract class EdiblePlant extends Plant {

    //eaten: boolean;
    eat_value : number;

    bites_taken : number=0;

    dibs : number=0;

    eaten = false;

    Eat(time_step:number):number{
        this.dibs = 166;
        if (this.eaten)
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

    Dibs(d:number) :void{
        this.dibs = d;
    }

    abstract get Available() : boolean;
}