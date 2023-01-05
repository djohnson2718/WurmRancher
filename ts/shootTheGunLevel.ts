import { shotsFired } from "./gameControl.js";
import { Theme } from "./theme.js";
import { TimedLevel } from "./timedLevel.js";

export class shootTheGunLevel extends TimedLevel{
    constructor(theme:Theme){
        super(theme,90000);
    }

    Name = "Shoot the Gun";
    Description = "Shoot the gun once to win. For testing. testing. testing.";
    QuickObjectives = "shoot the gun";

    Update(time_step:number){
        super.Update(time_step);
        if (shotsFired > 0)
            this.Victory();
    }
}