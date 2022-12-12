import { ShowDefeat, ShowMessage, ShowVictory } from "./gameControl.js";
import { Theme } from "./theme.js";
import { RelativeTimeToFrames } from "./timing.js";

export enum CompletionStatus{
    Unattempted = 0,
    Attempted = 1,
    Completed = 2
}

export class Level{
    completionStatus : CompletionStatus;
    gameover : boolean;
    theme : Theme;

    //default values
    WeedGrowthRate = RelativeTimeToFrames(3);
    PoisonWeedGrowthRate = RelativeTimeToFrames(4);
    Name = "unknown";
    Description = "no description available";
    NoUserControl = false;
    Version = "1";
    QuickObjectives = "objectives unknown";
    SeedDisabled = "false";
    MakeFeedersAtWill = "false";
    
    get ID():string{
        return this.Name + this.Version;
    }

    constructor(theme : Theme){
        this.theme = theme;
        // load saved data?
    }

    elapsed_frames = 0;

    Update() : void{
        if (this.gameover)
            return;
        this.elapsed_frames++;
        if (this.elapsed_frames == 1 && !this.NoUserControl)
            ShowMessage(this.Name + ": " + this.Description );
    }

    InitializeLevel() :void{
        this.elapsed_frames = 0;
        this.gameover = false;
        if (this.completionStatus == CompletionStatus.Unattempted)
        {
            this.completionStatus = CompletionStatus.Attempted;
            //levelData[this.ID + "_a"] = true;
        }
        //if (!this.gameover && StatusChanged != null)
        //    StatusChanged(this, new EventArgs());
    }

    Victory(message :string = null) : void{
        if (this.gameover)
            return;
        if (message == null)
            message = "You have completed the mission " + this.Name + "!";
        this.completionStatus = CompletionStatus.Completed;
        //levelData[this.ID + "_c"] = true;
        this.gameover = true;
        //if (StatusChanged != null)
        //    StatusChanged(this, new EventArgs());
        ShowVictory(message);
    }

    Defeat(message : string = null) : void{
        if (this.gameover)
            return;
        if (message == null)
            message = "You failed to complete the mission objectives.";            
        this.gameover = true;
        ShowDefeat(message);
        //if (StatusChanged != null)
        //    StatusChanged(this, new EventArgs());
    }

    IntervalTimeIsUp( rel_interval : number, real_offset : number) : boolean{
        let interval = RelativeTimeToFrames(rel_interval);
        let offset = RelativeTimeToFrames(real_offset);
        return (this.elapsed_frames % interval == offset); // make sure this works ok with numbers!!!
    }

    OneTimeTriggerIsUp(rel_time:number){
        return (this.elapsed_frames == RelativeTimeToFrames(rel_time));
    }

    //theControl should call this if the level is stopped prematurely.
    Quit() : void
    {
        //if (!this.gameover && StatusChanged != null)
        //    StatusChanged(this, new EventArgs());
    }

}