import { Feeder } from "./feeder.js";
import { AddCreatureOnEdge, GrowRandomWeed } from "./gameControl.js";
import { GrassEater } from "./grassEater.js";
import { TimedLevel } from "./timedLevel.js";
import { Wurm } from "./wurm.js";
export class FirstGrassEaterLevel extends TimedLevel {
    constructor(theme) {
        super(theme, 80);
        this.length_to_win = 12;
        this.Name = "We've got company!";
        this.description = "The blue creatures want to steal your grass!  Blast them with your gun!  Grow your wurm to length ${this.length_to_win} before the timer runs out to win!";
        this.quickObjectives = "Grow your wurm to length ${length_to_win}";
    }
    InitializeLevel() {
        super.InitializeLevel();
        this.theWurm = new Wurm(3, 100, 100);
        //Length change
        //AddCounter(new WurmCounter(this.theWurm));
    }
    Update() {
        super.Update();
        if (this.IntervalTimeIsUp(4))
            AddCreatureOnEdge(new GrassEater());
        if (this.IntervalTimeIsUp(3))
            AddCreatureOnEdge(new Feeder());
        if (this.IntervalTimeIsUp(8))
            GrowRandomWeed();
    }
}
//# sourceMappingURL=firstGrassEaterLevel.js.map