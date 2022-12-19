import { Feeder } from "./feeder.js";
import { AddCounter, AddCreatureOnEdge, GrowRandomWeed } from "./gameControl.js";
import { GrassEater } from "./grassEater.js";
import { Monster } from "./monster.js";
import { TimedLevel } from "./timedLevel.js";
import { Wurm } from "./wurm.js";
import { WurmCounter } from "./wurmCounter.js";
export class MonsterLevel extends TimedLevel {
    constructor(theme) {
        super(theme, 80000);
        this.length_to_win = 12;
        this.Name = "The monster is coming";
        this.Description = `Your tasty feeders have attracted the attention of some of the native fauna.  Protect them at all costs!  Grow your wurm to length ${this.length_to_win} to win.`;
        this.QuickObjectives = `Grow your wurm to length ${this.length_to_win}.`;
    }
    InitializeLevel() {
        super.InitializeLevel();
        this.theWurm = new Wurm(3, 100, 100);
        //this.theWurm.LengthChange += new EventHandler<GameEventArgs>(theWurm_Grows);
        AddCounter(new WurmCounter(this.theWurm));
        GrowRandomWeed();
        GrowRandomWeed();
        GrowRandomWeed();
    }
    Update(time_step) {
        super.Update(time_step);
        if (this.IntervalTimeIsUp(4000))
            AddCreatureOnEdge(new GrassEater());
        if (this.IntervalTimeIsUp(3000))
            AddCreatureOnEdge(new Feeder());
        if (this.IntervalTimeIsUp(11000))
            AddCreatureOnEdge(new Monster());
        if (this.IntervalTimeIsUp(6000))
            GrowRandomWeed();
        if (this.theWurm.Length >= this.length_to_win)
            this.Victory();
    }
}
//# sourceMappingURL=monsterLevel.js.map