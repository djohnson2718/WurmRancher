import { BigMonster } from "./bigMonster.js";
import { AddCounter, GrowRandomWeed, GrowRandomPoisonWeed, AddCreatureOnEdge } from "./gameControl.js";
import { GrassEater } from "./grassEater.js";
import { Monster } from "./monster.js";
import { Parasite } from "./parasite.js";
import { TimedLevel } from "./timedLevel.js";
import { Wurm } from "./wurm.js";
import { WurmCounter } from "./wurmCounter.js";
export class BigWurmContest extends TimedLevel {
    constructor(theme) {
        super(theme, 90000);
        this.Name = "Giant Wurm Contest";
        this.Description = "See how big you can grow your wurm before the time runs out. You can have as many feeders as you want, just press Space to get a new one!";
        this.QuickObjectives = "Grow until the time runs out! Push Space for feeders!";
        this.MakeFeedersAtWill = true;
        this.low_score_best = false;
    }
    InitializeLevel() {
        super.InitializeLevel();
        this.theWurm = new Wurm(3, 100, 100);
        AddCounter(new WurmCounter(this.theWurm));
        GrowRandomWeed();
        GrowRandomWeed();
        GrowRandomWeed();
        GrowRandomPoisonWeed();
    }
    Update(time_step) {
        super.Update(time_step);
        if (this.IntervalTimeIsUp(6000))
            AddCreatureOnEdge(new GrassEater());
        if (this.IntervalTimeIsUp(14000))
            AddCreatureOnEdge(new Monster());
        if (this.IntervalTimeIsUp(15000))
            AddCreatureOnEdge(new Parasite());
        if (this.IntervalTimeIsUp(90000, 45000))
            AddCreatureOnEdge(new BigMonster());
        if (this.IntervalTimeIsUp(7000)) {
            GrowRandomWeed();
            GrowRandomPoisonWeed();
        }
    }
    Defeat(message) {
        this.score = this.theWurm.length;
        this.Victory(`Time is up! Your wurm grew to a length of ${this.theWurm.Length}!`);
    }
}
//# sourceMappingURL=bigWurmContest.js.map