import { ReportDefeat, ShowMessage, ReportVictory } from "./gameControl.js";
import { Theme } from "./theme.js";

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
    WeedGrowthRate = 3000;
    PoisonWeedGrowthRate = 4000;
    Name = "unknown";
    Description = "no description available";
    NoUserControl = false;
    Version = "1";
    QuickObjectives = "objectives unknown";
    SeedDisabled = "false";
    MakeFeedersAtWill = "false";
    elapsed_time : number;
    last_time_step :number;
    
    get ID():string{
        return this.Name + this.Version;
    }

    constructor(theme : Theme){
        this.theme = theme;
        // load saved data?
    }

    Update(time_step: number) : void{
        if (this.gameover)
            return;
        this.last_time_step = time_step;
        this.elapsed_time += time_step;
    
        //this.elapsed_frames++;
        //if (this.elapsed_frames == 1 && !this.NoUserControl)
        //    ShowMessage(this.Name + ": " + this.Description );
    }

    InitializeLevel() :void{
        this.elapsed_time = 0;
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
        ReportVictory(message);
    }

    Defeat(message : string = null) : void{
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
    Quit() : void
    {
        //if (!this.gameover && StatusChanged != null)
        //    StatusChanged(this, new EventArgs());
    }

    IntervalTimeIsUp( interval : number, offset : number=0) : boolean{
        return ((this.elapsed_time + offset) % interval < this.last_time_step);
        //let interval = RelativeTimeToFrames(rel_interval);
        //let offset = RelativeTimeToFrames(real_offset);
        //console.log(this.elapsed_frames, interval,offset, this.elapsed_frames % interval == offset)
        //return (this.elapsed_frames % interval == offset); // make sure this works ok with numbers!!!
    }

    OneTimeTriggerIsUp(rel_time:number){
        return ((this.elapsed_time >= rel_time) &&  this.elapsed_time - rel_time < this.last_time_step);
    }

}
