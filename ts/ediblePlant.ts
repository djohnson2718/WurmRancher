import { RemovePlant } from "./gameControl.js";
import { Plant } from "./plant.js";
import { EatGrassTime } from "./timing.js";

export abstract class EdiblePlant extends Plant {

    //eaten: boolean;
    eat_value : number;

    bites_taken : number=0;

    dibs : number=0;

    Eat():number{
        this.bites_taken++;
        console.log("eating", this.bites_taken);
        if (this.bites_taken >= EatGrassTime)
            RemovePlant(this);
        this.dibs = 5;

        //returns 1 if the caller should get credit for eating this.
        if (this.bites_taken == EatGrassTime)
        {
            //if (SoundEffectsOn)
            //    GrassEatenSound.Play();
            return this.eat_value;
        }
        else
            return 0;
    }

    get Eaten() : boolean{
        return this.bites_taken >= EatGrassTime;
    }

    Update() :void{
        if (this.dibs>0){
            this.dibs--;
        }
        super.Update();
        
    }

    Dibs(d:number) :void{
        this.dibs = d;
    }

    abstract get Available() : boolean;
}