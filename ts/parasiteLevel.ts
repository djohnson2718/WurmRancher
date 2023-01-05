import { Feeder } from "./feeder.js";
import { AddCounter, AddCreature, AddCreatureOnEdge, GrowRandomWeed } from "./gameControl.js";
import { GrassEater } from "./grassEater.js";
import { Parasite } from "./parasite.js";
import { Theme } from "./theme.js";
import { TimedLevel } from "./timedLevel.js";
import { Wurm } from "./wurm.js";
import { WurmCounter } from "./wurmCounter.js";

export class ParasiteLevel extends TimedLevel{
    Name = "Red Spider Wurm Parasites";
    length_to_win = 15;
    Description = `Watch out for the red spider wurm parasites!  They want to attach to your wurm and eat his segments!  Grow your wurm to length ${this.length_to_win} to win.`;
    QuickObjectives = `Grow your wurm to length ${this.length_to_win}.`;

    theWurm : Wurm;

    constructor(theme : Theme){
        super(theme,70000);
    }

    InitializeLevel(): void {
        super.InitializeLevel();
        this.theWurm = new Wurm(8,100,100);
        AddCounter(new WurmCounter(this.theWurm));
        AddCreatureOnEdge(new Parasite());
        for (let i =0; i <4; i++)
            GrowRandomWeed();
        console.log("initialized");
    }

    Update(time_step:number) :void
    {
        super.Update(time_step);
        if (this.IntervalTimeIsUp(5000))
            AddCreatureOnEdge(new GrassEater());
        if (this.IntervalTimeIsUp(3000))
            AddCreatureOnEdge(new Feeder());
        if (this.IntervalTimeIsUp(8000))
            AddCreatureOnEdge(new Parasite());
        if (this.IntervalTimeIsUp(4000))
            GrowRandomWeed();

        if (this.theWurm.Length >= this.length_to_win)
            this.Victory();
    
    }
}