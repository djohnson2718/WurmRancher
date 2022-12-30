import { Feeder } from "./feeder.js";
import { AddCounter,  AddCreatureOnEdge, GrowRandomPoisonWeed, GrowRandomWeed } from "./gameControl.js";
import { GrassEater } from "./grassEater.js";
import { Monster } from "./monster.js";
import { Parasite } from "./parasite.js";
import { Theme } from "./theme.js";
import { TimedLevel } from "./timedLevel.js";
import { Wurm } from "./wurm.js";
import { WurmCounter } from "./wurmCounter.js";

export class PoisonWeedLevel extends TimedLevel{
    length_to_win = 11;
    Name = "Poison Plants";
    Description = `There is a new kind of weed around... apparently the feeders like to eat it, but it is not very healthy for them.  Spray them quickly! Grow your wurm to length ${this.length_to_win} to win!`;
    QuickObjectives = `Grow your wurm to length ${this.length_to_win}.`;

    theWurm : Wurm;

    constructor(theme :Theme){
        super(theme, 70000);
    }
    InitializeLevel():void
    {
        super.InitializeLevel();
        this.theWurm = new Wurm(3, 100, 100);
        AddCounter(new WurmCounter(this.theWurm));
        AddCreatureOnEdge(new GrassEater());

        GrowRandomPoisonWeed(); 
        GrowRandomPoisonWeed();
    }

    Update(timeStep:number):void
    {
        super.Update(timeStep);
        if (this.IntervalTimeIsUp(6500))
            AddCreatureOnEdge(new GrassEater());
        if (this.IntervalTimeIsUp(3000))
            AddCreatureOnEdge(new Feeder());
        if (this.IntervalTimeIsUp(16000))
            AddCreatureOnEdge(new Parasite());
        if (this.IntervalTimeIsUp(16000, 9000))
            AddCreatureOnEdge(new Monster());
        if (this.IntervalTimeIsUp(5000))
            GrowRandomWeed();
        if (this.IntervalTimeIsUp(6000))
            GrowRandomPoisonWeed();
        if (this.theWurm.Length >= this.length_to_win)
            this.Victory();

    }
}