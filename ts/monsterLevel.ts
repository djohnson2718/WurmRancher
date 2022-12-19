import { Feeder } from "./feeder.js";
import { AddCounter, AddCreature, AddCreatureOnEdge, GrowRandomWeed } from "./gameControl.js";
import { GrassEater } from "./grassEater.js";
import { Monster } from "./monster.js";
import { Theme } from "./theme.js";
import { TimedLevel } from "./timedLevel.js";
import { Wurm } from "./wurm.js";
import { WurmCounter } from "./wurmCounter.js";

export class MonsterLevel extends TimedLevel{

    length_to_win = 12;
    theWurm : Wurm;

    constructor(theme :Theme){
        super(theme,80000);
        this.Name = "The monster is coming";
        this.Description = `Your tasty feeders have attracted the attention of some of the native fauna.  Protect them at all costs!  Grow your wurm to length ${this.length_to_win} to win.`;
        this.QuickObjectives = `Grow your wurm to length ${this.length_to_win}.`;
    }

    InitializeLevel() : void 
    {
        super.InitializeLevel();
        this.theWurm = new Wurm(3, 100, 100);
        //this.theWurm.LengthChange += new EventHandler<GameEventArgs>(theWurm_Grows);
        AddCounter(new WurmCounter(this.theWurm));
        GrowRandomWeed();
        GrowRandomWeed();
        GrowRandomWeed();
    }


    Update(time_step:number) : void
    {
        super.Update(time_step);
        
        if (this.IntervalTimeIsUp(4))
            AddCreatureOnEdge(new GrassEater());
        if (this.IntervalTimeIsUp(3))
            AddCreatureOnEdge(new Feeder());
        if (this.IntervalTimeIsUp(11))
            AddCreatureOnEdge(new Monster());
        if (this.IntervalTimeIsUp(6))
            GrowRandomWeed();
        
        if (this.theWurm.Length >= this.length_to_win)
            this.Victory();
    }

    //theWurm_Grows(object sender, GameEventArgs e) : void
    //{
    //    if (this.theWurm.Length >= this.length_to_win)
    //        this.Victory(e.theControl);
    //}
}


