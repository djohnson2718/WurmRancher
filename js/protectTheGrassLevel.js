import { Counter } from "./counter.js";
import { AddCounter, AddCreatureOnEdge, CountGoodGrass, FillWithGrass, HasGoodGrass } from "./gameControl.js";
import { GrassEater } from "./grassEater.js";
import { Level } from "./level.js";
export class ProtectTheGrassLevel extends Level {
    constructor() {
        super(...arguments);
        this.Name = "Protect the Grass";
        this.num_eaters = 60;
        this.Description = `We have a nice field of grass all ready, but there is a massive herd of grass eaters coming in.  Blast all ${this.num_eaters} of them before the grass is all gone!`;
        this.QuickObjectives = `Shoot all ${this.num_eaters} grasss eaters before the grass is gone.`;
        this.SeedDisabled = true;
        this.low_score_best = false;
    }
    InitializeLevel() {
        super.InitializeLevel();
        this.eaters_arrived = 0;
        this.eaters_counter = new Counter("Remaining");
        this.eaters_counter.Value = this.num_eaters;
        AddCounter(this.eaters_counter);
        this.eaters_shot = 0;
        FillWithGrass();
    }
    Update(timeStep) {
        super.Update(timeStep);
        if (this.eaters_arrived < this.num_eaters && this.IntervalTimeIsUp(200)) {
            this.eaters_arrived++;
            let g = new GrassEater();
            g.ShotHandler = this.g_Shot.bind(this);
            AddCreatureOnEdge(g);
        }
        if (this.IntervalTimeIsUp(500)) {
            if (!HasGoodGrass())
                this.Defeat();
        }
    }
    g_Shot() {
        this.eaters_shot++;
        this.eaters_counter.Value = this.num_eaters - this.eaters_shot;
        if (this.eaters_shot == this.num_eaters) {
            this.score = CountGoodGrass();
            this.Victory(`You saved ${this.score} pieces of grass!`);
        }
    }
}
//# sourceMappingURL=protectTheGrassLevel.js.map