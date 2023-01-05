import { BigMonster } from "./bigMonster.js";
import { Feeder } from "./feeder.js";
import { AddCounter, AddCreatureOnEdge, GrowRandomWeed } from "./gameControl.js";
import { GrassEater } from "./grassEater.js";
import { Theme } from "./theme.js";
import { TimedLevel } from "./timedLevel.js";
import { Wurm } from "./wurm.js";
import { WurmCounter } from "./wurmCounter.js";

export class BigMonsterLevel extends TimedLevel{
    length_to_win = 12;
    Name = "Monster Boss";
    Description = `There seems to be a new kind of creature interfering with your operation... it is huge, tramples your grass and feeders, and spreads weeds. You laser seems ineffective against his thick armor. Maybe if you shoot him in the eye it will work... but that might make him mad.  Grow your wurm to length ${this.length_to_win} to win.`;
    QuickObjectives = `Grow your wurm to length ${this.length_to_win}`;
    theWurm : Wurm;
    
    constructor(theme:Theme){
        super(theme, 80000);
    }
    InitializeLevel() :void
    {
        super.InitializeLevel();
        this.theWurm = new Wurm( 3, 100, 100);
        AddCounter(new WurmCounter(this.theWurm));
        GrowRandomWeed();
        GrowRandomWeed();
        GrowRandomWeed();

        //for testing
        AddCreatureOnEdge(new BigMonster());
        
    }


    Update(timeStep:number) : void
    {
        super.Update(timeStep);
        
        if (this.IntervalTimeIsUp(7000))
            AddCreatureOnEdge(new GrassEater());
        if (this.IntervalTimeIsUp(3000))
            AddCreatureOnEdge(new Feeder());
        if (this.IntervalTimeIsUp(18000))
            AddCreatureOnEdge(new BigMonster());
        if (this.IntervalTimeIsUp(8000))
            GrowRandomWeed();

        if (this.theWurm.Length >= this.length_to_win)
            this.Victory();
        
    }

}