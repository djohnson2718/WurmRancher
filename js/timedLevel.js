import { Level } from "./level.js";
import { AddCounter } from "./gameControl.js";
import { FramesToRealTime, RelativeTimeToFrames } from "./timing.js";
import { Counter } from "./counter.js";
export class TimedLevel extends Level {
    constructor(theme, rel_time_allowed) {
        super(theme);
        this.rel_time_allowed = rel_time_allowed;
    }
    InitializeLevel() {
        super.InitializeLevel();
        this.frames_left = RelativeTimeToFrames(this.rel_time_allowed);
        this.timer = new Counter("Time Left");
        this.timer.Value = String(this.frames_left);
        AddCounter(this.timer);
    }
    Update() {
        super.Update();
        if (!this.gameover) {
            this.frames_left--;
            this.timer.Value = String(this.frames_left);
            if (this.frames_left <= 0) {
                this.Defeat();
                this.gameover = true;
            }
        }
    }
    Victory(message = null) {
        let score = FramesToRealTime(this.frames_left);
        if (message == null)
            message = "You completed the objectives in time and beat the level!";
        // create the high score control
        //_3XH.IHighScoreCtrl highScoreCtrl = _3XH.API.Instance.createHighScoreCtrl();
        // init the high score control with the application key and secret
        //highScoreCtrl.init(ApplicationKey, ApplicationSecret);
        // set the event handler that will be called when the user closes the high score control
        //highScoreCtrl.setOnCloseHandler((sender, e) => { highScoreCtrl.hide(); });
        //    if (!high_score_submitted)
        //    {
        //        high_score_submitted = true;
        // call submit score
        //            highScoreCtrl.submitScore(score, HighScoreName);
        //        }
        super.Victory(message);
    }
    Defeat(message = null) {
        if (message == null)
            message = "You did not complete the objectives in the allotted time. Try again.";
        super.Defeat(message);
    }
}
//# sourceMappingURL=timedLevel.js.map