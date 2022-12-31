import { Counter } from "./counter.js";
import { Feeder } from "./feeder.js";
import { AddCounter, WeedRatio, GrowRandomWeed, AddCreatureOnEdge } from "./gameControl.js";
import { GrassEater } from "./grassEater.js";
import { Monster } from "./monster.js";
import { TimedLevel } from "./timedLevel.js";
import { Wurm } from "./wurm.js";
import { WurmCounter } from "./wurmCounter.js";
export class WeedLevel extends TimedLevel {
    constructor(theme) {
        super(theme, 70000);
        this.WeedGrowthRate = 2000;
        this.Name = "Weed Invasion!";
        this.length_to_win = 10;
        this.ratio_to_win = .20;
        this.Description = `This area seems to be particularly overgrown. No matter-- just use your spray!  Grow your wurm to length ${this.length_to_win} to win!  And while your at it, make sure the weed ratio is less than ${this.ratio_to_win}.`;
        this.QuickObjectives = `Grow your wurm to length ${this.length_to_win} and get the weed ratio down to ${this.ratio_to_win.toFixed(2)}.`;
    }
    InitializeLevel() {
        super.InitializeLevel();
        this.theWurm = new Wurm(3, 100, 100);
        AddCounter(new WurmCounter(this.theWurm));
        this.WeedDensityCounter = new Counter("Weed Density");
        AddCounter(this.WeedDensityCounter);
        while (WeedRatio() < .4)
            GrowRandomWeed();
        this.weed_ratio = WeedRatio();
        this.WeedDensityCounter.Value = (this.weed_ratio * 100).toFixed(1) + "%";
    }
    Update(time_step) {
        super.Update(time_step);
        if (this.IntervalTimeIsUp(1000))
            GrowRandomWeed();
        if (this.IntervalTimeIsUp(6000))
            AddCreatureOnEdge(new GrassEater());
        if (this.IntervalTimeIsUp(3000))
            AddCreatureOnEdge(new Feeder());
        if (this.IntervalTimeIsUp(15000))
            AddCreatureOnEdge(new Monster());
        if (this.IntervalTimeIsUp(300)) {
            this.weed_ratio = WeedRatio();
            this.WeedDensityCounter.Value = (this.weed_ratio * 100).toFixed(1) + "%";
        }
        if ((this.theWurm.Length >= this.length_to_win) && this.weed_ratio <= this.ratio_to_win)
            this.Victory();
    }
}
//# sourceMappingURL=weedLevel.js.map