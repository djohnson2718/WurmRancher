import { BigMonster } from "./bigMonster.js";
import { Counter } from "./counter.js";
import { Feeder } from "./feeder.js";
import { AddCounter, AddCreatureOnEdge, GrowRandomWeed, shotsFired, shotsHit } from "./gameControl.js";
import { GrassEater } from "./grassEater.js";
import { Monster } from "./monster.js";
import { Parasite } from "./parasite.js";
import { TimedLevel } from "./timedLevel.js";
import { Wurm } from "./wurm.js";
import { WurmCounter } from "./wurmCounter.js";
export class SharpShooterLevel extends TimedLevel {
    constructor(theme) {
        super(theme, 70000);
        this.allowed_misses = 3;
        this.allowed_accuracy = 75;
        this.length_to_win = 12;
        this.Name = "Sharpshooter Challenge";
        this.Description = `Ammo is in short supply... if you miss more than ${this.allowed_misses} shots and go below ${this.allowed_accuracy}% accuracy, you lose. (Shooting your wurm is excluded.) Grow your wurm to length ${this.length_to_win} to win.`;
        this.QuickObjectives = `Grow wurm to ${this.length_to_win}, don't both miss more than ${this.allowed_misses} shots and go below ${this.allowed_accuracy}% accuracy.`;
    }
    InitializeLevel() {
        super.InitializeLevel();
        this.theWurm = new Wurm(4, 100, 100);
        AddCounter(new WurmCounter(this.theWurm));
        this.MissedCounter = new Counter("Missed");
        this.AccuracyCounter = new Counter("Accuracy");
        this.MissedCounter.Value = 0;
        this.AccuracyCounter.Value = "--";
        AddCounter(this.MissedCounter);
        AddCounter(this.AccuracyCounter);
        for (let i = 0; i < 4; i++)
            GrowRandomWeed();
    }
    Update(time_step) {
        super.Update(time_step);
        if (this.IntervalTimeIsUp(4000))
            AddCreatureOnEdge(new GrassEater());
        if (this.IntervalTimeIsUp(3000))
            AddCreatureOnEdge(new Feeder());
        if (this.IntervalTimeIsUp(20000, 10000))
            AddCreatureOnEdge(new Monster());
        if (this.IntervalTimeIsUp(20000))
            AddCreatureOnEdge(new Parasite());
        if (this.IntervalTimeIsUp(43000))
            AddCreatureOnEdge(new BigMonster());
        if (this.IntervalTimeIsUp(7000))
            GrowRandomWeed();
        if (!(shotsFired == 0)) {
            let acc_per = shotsHit / shotsFired * 100;
            this.AccuracyCounter.Value = acc_per.toFixed(1) + "%";
            this.MissedCounter.Value = shotsFired - shotsHit;
            if (shotsFired - shotsHit > this.allowed_misses && acc_per < this.allowed_accuracy)
                this.Defeat("You wasted too much ammo!");
        }
        if (this.theWurm.Length >= this.length_to_win)
            this.Victory();
    }
}
//# sourceMappingURL=sharpShooterLevel.js.map