import { Feeder } from "./feeder.js";
import { AddCounter, AddCreatureOnEdge, GrowRandomWeed } from "./gameControl.js";
import { GrassEater } from "./grassEater.js";
import { Theme } from "./theme.js";
import { TimedLevel } from "./timedLevel.js";
import { Wurm } from "./wurm.js";
import { WurmCounter } from "./wurmCounter.js";

export class FirstGrassEaterLevel extends TimedLevel {
    length_to_win = 12;
    //highScoreName: string;

    theWurm : Wurm;

    constructor(theme : Theme){
        super(theme,80000);
        this.Name = "We've got company!";
        this.Description = `The blue creatures want to steal your grass!  Blast them with your gun!  Grow your wurm to length ${this.length_to_win} before the timer runs out to win!`;
        this.QuickObjectives = `Grow your wurm to length ${this.length_to_win}.`;
    }

    InitializeLevel() :void{
        super.InitializeLevel();
        this.theWurm = new Wurm(3,100,100);
        AddCounter(new WurmCounter(this.theWurm));
        //Length change
        //AddCounter(new WurmCounter(this.theWurm));
    }

    Update(time_step:number): void {
        super.Update(time_step);

        if (this.IntervalTimeIsUp(4000))
            AddCreatureOnEdge(new GrassEater());
        if (this.IntervalTimeIsUp(3000))
            AddCreatureOnEdge(new Feeder());
        if (this.IntervalTimeIsUp(8000))
            GrowRandomWeed();
        
        if (this.theWurm.Length >= this.length_to_win)
            this.Victory();
    }
}