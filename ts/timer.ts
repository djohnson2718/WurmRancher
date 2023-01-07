import { Counter } from "./counter.js";
import { GameElement } from "./gameElement.js";
import { TimedLevel } from "./timedLevel.js";

export class Timer extends Counter implements GameElement{

    level:TimedLevel;
    Name = "Timer";
    Layer = -1;
    
    constructor(level : TimedLevel){
        super("Time left");
        this.level = level;
    }
    Update(timeStep : number) : void{
        if (this.level.time_allowed < this.level.elapsed_time)
            this.Value = "0.0";
        else
            this.Value = ((this.level.time_allowed - this.level.elapsed_time)/1000).toFixed(1);
    }
}