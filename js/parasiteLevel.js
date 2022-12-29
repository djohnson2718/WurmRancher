import { Feeder } from "./feeder.js";
import { AddCounter, AddCreatureOnEdge, GrowRandomWeed } from "./gameControl.js";
import { GrassEater } from "./grassEater.js";
import { Parasite } from "./parasite.js";
import { TimedLevel } from "./timedLevel.js";
import { Wurm } from "./wurm.js";
import { WurmCounter } from "./wurmCounter.js";
export class ParasiteLevel extends TimedLevel {
    constructor(theme) {
        super(theme, 70000);
        this.Name = "Red Spider Wurm Parasites";
        this.length_to_win = 15;
        this.Description = `Watch out for the red spider wurm parasites!  They want to attach to your wurm and eat his segments!  Grow your wurm to length ${this.length_to_win} to win.`;
        this.QuickObjectives = `Grow your wurm to length ${this.length_to_win}`;
    }
    InitializeLevel() {
        super.InitializeLevel();
        this.theWurm = new Wurm(8, 100, 100);
        AddCounter(new WurmCounter(this.theWurm));
        AddCreatureOnEdge(new Parasite());
        for (let i = 0; i < 4; i++)
            GrowRandomWeed();
        console.log("initialized");
    }
    Update(time_step) {
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
//# sourceMappingURL=parasiteLevel.js.map