import { BigMonster } from "./bigMonster.js";
import { Feeder } from "./feeder.js";
import { AddCounter, AddCreatureOnEdge, GrowRandomWeed } from "./gameControl.js";
import { GrassEater } from "./grassEater.js";
import { Monster } from "./monster.js";
import { Parasite } from "./parasite.js";
import { Theme } from "./theme.js";
import { TimedLevel } from "./timedLevel.js";
import { Wurm } from "./wurm.js";
import { WurmCounter } from "./wurmCounter.js";

export class DoubleWurmLevel extends TimedLevel{
    combined_length_to_win = 18;
    min_length_to_win = 7;
    theWurm1 : Wurm;
    theWurm2 : Wurm;
    Name = "Double Trouble";
    Description = `Can you raise two wurms at once? Get a combined length of ${this.combined_length_to_win}, with each wurm at least ${this.min_length_to_win} to win!`;
    QuickObjectives = `Grow your wurms to at least ${this.min_length_to_win} each and at least ${this.combined_length_to_win} total.`;

    constructor(theme:Theme){
        super(theme, 85000);
    }

    InitializeLevel(): void {
        super.InitializeLevel();
        this.theWurm1 = new Wurm(4, 100, 100);
        this.theWurm2 = new Wurm(4, 300, 300);
        AddCounter(new WurmCounter(this.theWurm1));
        AddCounter(new WurmCounter(this.theWurm2));
        GrowRandomWeed();
        GrowRandomWeed();
        GrowRandomWeed();
    }

    Update(time_step: number): void {
        super.Update(time_step);
        if (this.IntervalTimeIsUp(6000))
            AddCreatureOnEdge(new GrassEater());
        if (this.IntervalTimeIsUp(1800))
            AddCreatureOnEdge(new Feeder());
        if (this.IntervalTimeIsUp(20000, 10000))
            AddCreatureOnEdge(new Monster());
        if (this.IntervalTimeIsUp(20000))
            AddCreatureOnEdge(new Parasite());
        if (this.IntervalTimeIsUp(80000, 30000))
            AddCreatureOnEdge(new BigMonster());
        if (this.IntervalTimeIsUp(6000))
            GrowRandomWeed();

        if (this.theWurm1.Length >= this.min_length_to_win && this.theWurm2.Length >= this.min_length_to_win && this.theWurm1.Length + this.theWurm2.Length >= this.combined_length_to_win)
            this.Victory();
    }

}