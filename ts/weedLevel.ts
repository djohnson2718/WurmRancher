import { Counter } from "./counter.js";
import { Feeder } from "./feeder.js";
import { AddCounter, WeedRatio, GrowRandomWeed, AddCreature, AddCreatureOnEdge } from "./gameControl.js";
import { GrassEater } from "./grassEater.js";
import { Monster } from "./monster.js";
import { Theme } from "./theme.js";
import { TimedLevel } from "./timedLevel.js";
import { Wurm } from "./wurm.js";
import { WurmCounter } from "./wurmCounter.js";

export class WeedLevel extends TimedLevel{
    WeedGrowthRate = 2000;
    Name = "Weed Invasion!";
    length_to_win = 10;
    ratio_to_win = .20;

    theWurm : Wurm;
    WeedDensityCounter : Counter;

    constructor(theme:Theme){
        super(theme, 70000);
        this.Description = `This area seems to be particularly overgrown. No matter-- just use your spray!  Grow your wurm to length ${this.length_to_win} to win!  And while your at it, make sure the weed ratio is less than ${this.ratio_to_win}.`;
        this.QuickObjectives = `Grow your wurm to length ${this.length_to_win} and get the weed ratio down to ${this.ratio_to_win.toFixed(2)}.`;
    }

    InitializeLevel(): void {
        super.InitializeLevel();
        this.theWurm = new Wurm(3, 100,100);
        AddCounter(new WurmCounter(this.theWurm));
        this.WeedDensityCounter = new Counter("Weed Density");
        AddCounter(this.WeedDensityCounter);
        while (WeedRatio() < .4)
            GrowRandomWeed();
        this.WeedDensityCounter.Value = WeedRatio().toFixed(2);
    }

    Update(time_step: number): void {
        super.Update(time_step);

        if (this.IntervalTimeIsUp(1000))
            GrowRandomWeed();
        if (this.IntervalTimeIsUp(6000))
            AddCreatureOnEdge(new GrassEater());
        if (this.IntervalTimeIsUp(3000))
            AddCreatureOnEdge(new Feeder());
        if (this.IntervalTimeIsUp(15000))
            AddCreatureOnEdge(new Monster());

        if ((this.theWurm.Length >= this.length_to_win) && this.IntervalTimeIsUp(500))
        {
            let weed_ratio = WeedRatio();
            this.WeedDensityCounter.Value =  WeedRatio().toFixed(2);
            if (weed_ratio <= this.ratio_to_win)
                this.Victory();
        }
    }
}