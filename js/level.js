import { ReportDefeat, ReportVictory } from "./gameControl.js";
export var CompletionStatus;
(function (CompletionStatus) {
    CompletionStatus[CompletionStatus["Unattempted"] = 0] = "Unattempted";
    CompletionStatus[CompletionStatus["Attempted"] = 1] = "Attempted";
    CompletionStatus[CompletionStatus["Completed"] = 2] = "Completed";
})(CompletionStatus || (CompletionStatus = {}));
export class Level {
    get ID() {
        return this.Name + this.Version;
    }
    constructor(theme) {
        //default values
        this.WeedGrowthRate = 3000;
        this.PoisonWeedGrowthRate = 4000;
        this.Name = "unknown";
        this.Description = "no description available";
        this.NoUserControl = false;
        this.Version = "1";
        this.QuickObjectives = "objectives unknown";
        this.SeedDisabled = "false";
        this.MakeFeedersAtWill = "false";
        this.theme = theme;
        // load saved data?
    }
    Update(time_step) {
        if (this.gameover)
            return;
        this.last_time_step = time_step;
        this.elapsed_time += time_step;
        //this.elapsed_frames++;
        //if (this.elapsed_frames == 1 && !this.NoUserControl)
        //    ShowMessage(this.Name + ": " + this.Description );
    }
    InitializeLevel() {
        this.elapsed_time = 0;
        this.gameover = false;
        if (this.completionStatus == CompletionStatus.Unattempted) {
            this.completionStatus = CompletionStatus.Attempted;
            //levelData[this.ID + "_a"] = true;
        }
        //if (!this.gameover && StatusChanged != null)
        //    StatusChanged(this, new EventArgs());
    }
    Victory(message = null) {
        if (this.gameover)
            return;
        if (message == null)
            message = "You have completed the mission " + this.Name + "!";
        this.completionStatus = CompletionStatus.Completed;
        //levelData[this.ID + "_c"] = true;
        this.gameover = true;
        //if (StatusChanged != null)
        //    StatusChanged(this, new EventArgs());
        ReportVictory(message);
    }
    Defeat(message = null) {
        if (this.gameover)
            return;
        if (message == null)
            message = "You failed to complete the mission objectives.";
        this.gameover = true;
        ReportDefeat(message);
        //if (StatusChanged != null)
        //    StatusChanged(this, new EventArgs());
    }
    //theControl should call this if the level is stopped prematurely.
    Quit() {
        //if (!this.gameover && StatusChanged != null)
        //    StatusChanged(this, new EventArgs());
    }
    IntervalTimeIsUp(interval, offset = 0) {
        return ((this.elapsed_time + offset) % interval < this.last_time_step);
        //let interval = RelativeTimeToFrames(rel_interval);
        //let offset = RelativeTimeToFrames(real_offset);
        //console.log(this.elapsed_frames, interval,offset, this.elapsed_frames % interval == offset)
        //return (this.elapsed_frames % interval == offset); // make sure this works ok with numbers!!!
    }
    OneTimeTriggerIsUp(rel_time) {
        return ((this.elapsed_time >= rel_time) && this.elapsed_time - rel_time < this.last_time_step);
    }
}
//# sourceMappingURL=level.js.map