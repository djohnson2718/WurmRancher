import { BigMonster } from "./bigMonster.js";
import { Counter } from "./counter.js";
import { Feeder, max_fattened } from "./feeder.js";
import { AddCounter, AddCreature, AddCreatureOnEdge, GrowRandomPoisonWeed, GrowRandomWeed } from "./gameControl.js";
import { GrassEater } from "./grassEater.js";
import { Monster } from "./monster.js";
import { Theme } from "./theme.js";
import { TimedLevel } from "./timedLevel.js";

export class FeederLevel extends TimedLevel{
    maxed_feeders_to_win = 8;
    Name = "Feeder Raiser";
    Description = `It looks like the wurms aren't ready yet... but you might as well get the feeders ready.  Get ${this.maxed_feeders_to_win} feeders up to ${max_fattened} to win!`;
    QuickObjectives = `Get ${this.maxed_feeders_to_win} feeders to size ${max_fattened}.`;

    FeederCounter : Counter;

    feeders : Array<Feeder>;

    constructor(theme:Theme){
        super(theme,80000);
    }

    InitializeLevel(): void {
        super.InitializeLevel();
        this.FeederCounter = new Counter("Feeders");
        this.FeederCounter.Value = 0;
        AddCounter(this.FeederCounter);
        GrowRandomPoisonWeed();
        GrowRandomPoisonWeed();
        GrowRandomWeed();
        GrowRandomWeed();
        this.feeders = new Array<Feeder>();
        
        for (let i = 0; i < 3; i++) this.AddFeeder();

        AddCreatureOnEdge(new GrassEater());
    }

    Update(time_step: number): void {
        super.Update(time_step);
        if (this.IntervalTimeIsUp(4000))
            AddCreatureOnEdge(new GrassEater());
        if (this.IntervalTimeIsUp(3000))
            this.AddFeeder();
        if (this.IntervalTimeIsUp(9000))
            AddCreatureOnEdge(new Monster());
        if (this.IntervalTimeIsUp(6000))
            GrowRandomPoisonWeed();
        if (this.IntervalTimeIsUp(70000, 25000))
            AddCreatureOnEdge(new BigMonster());
        if (this.IntervalTimeIsUp(7000))
            GrowRandomWeed();

        if (this.IntervalTimeIsUp(200)){
            let fat_feeders_count = 0;
            for (let f of this.feeders){
                if (!(f.eaten) && f.fattened == max_fattened)
                    fat_feeders_count ++;
            }
            this.FeederCounter.Value = fat_feeders_count;
            if (fat_feeders_count >= this.maxed_feeders_to_win)
                this.Victory();
        }
    }

    AddFeeder(){
        let f = new Feeder();
        this.feeders.push(f);
        AddCreatureOnEdge(f);
    }


}