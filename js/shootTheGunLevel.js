import { shotsFired } from "./gameControl.js";
import { TimedLevel } from "./timedLevel.js";
export class shootTheGunLevel extends TimedLevel {
    constructor(theme) {
        super(theme, 90000);
        this.Name = "Shoot the Gun";
        this.Description = "Shoot the gun once to win. For testing. testing. testing.";
        this.QuickObjectives = "shoot the gun";
    }
    Update(time_step) {
        super.Update(time_step);
        if (shotsFired > 0)
            this.Victory();
    }
}
//# sourceMappingURL=shootTheGunLevel.js.map