import { Counter } from "./counter.js";
import { GameElement } from "./gameElement.js";
import { TimedLevel } from "./timedLevel.js";
import { FramesToRealTime } from "./timing.js";

export class Timer extends Counter implements GameElement{

    level:TimedLevel;
    Name = "Timer";
    Layer = -1;
    
    constructor(level : TimedLevel){
        super("Time left");
        this.level = level;
    }
    Update() : void{
        this.Value = FramesToRealTime(this.level.frames_left).toFixed(1);
    }
}