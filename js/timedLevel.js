import { Level } from "./level.js";
import { AddCounter } from "./gameControl.js";
import { Timer } from "./timer.js";
export class TimedLevel extends Level {
    //frames_left : number;
    //high_score : number;
    //timer: Timer;
    constructor(theme, time_allowed) {
        super(theme);
        this.time_allowed = time_allowed;
    }
    InitializeLevel() {
        super.InitializeLevel();
        //this.frames_left = RelativeTimeToFrames(this.rel_time_allowed);
        //this.timer = new Timer(this);
        AddCounter(new Timer(this));
    }
    Update(time_step) {
        super.Update(time_step);
        if (!this.gameover) {
            //this.frames_left--;
            if (this.elapsed_time >= this.time_allowed) {
                this.Defeat();
                this.gameover = true;
            }
        }
    }
    Victory(message = null) {
        let score = this.elapsed_time;
        if (message == null)
            message = `You completed the objectives with ${(score / 1000).toFixed(1)} seconds to spare and beat the level!`;
        super.Victory(message);
    }
    Defeat(message = null) {
        if (message == null)
            message = "You did not complete the objectives in the allotted time. Try again.";
        super.Defeat(message);
    }
}
//# sourceMappingURL=timedLevel.js.map