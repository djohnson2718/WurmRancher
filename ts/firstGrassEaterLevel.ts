import { Feeder } from "./feeder.js";
import { AddCreatureOnEdge, GrowRandomWeed } from "./gameControl.js";
import { GrassEater } from "./grassEater.js";
import { IntervalTimeIsUp } from "./level.js";
import { Theme } from "./theme.js";
import { TimedLevel } from "./timedLevel.js";
import { Wurm } from "./wurm.js";

export class FirstGrassEaterLevel extends TimedLevel {
    length_to_win = 12;
    Name = "We've got company!";
    description = "The blue creatures want to steal your grass!  Blast them with your gun!  Grow your wurm to length ${this.length_to_win} before the timer runs out to win!";
    quickObjectives ="Grow your wurm to length ${length_to_win}";
    //highScoreName: string;

    theWurm : Wurm;

    constructor(theme : Theme){
        super(theme,80);
    }

    InitializeLevel() :void{
        super.InitializeLevel();
        this.theWurm = new Wurm(3,100,100);
        //Length change
        //AddCounter(new WurmCounter(this.theWurm));
    }

    Update(): void {
        super.Update();
        if (IntervalTimeIsUp(4))
            AddCreatureOnEdge(new GrassEater());
        if (IntervalTimeIsUp(3))
            AddCreatureOnEdge(new Feeder());
        if (IntervalTimeIsUp(8))
            GrowRandomWeed();
    }
}