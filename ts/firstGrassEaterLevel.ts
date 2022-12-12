import { TimedLevel } from "./timedLevel.js";

export class FirstGrassEaterLevel extends TimedLevel {
    length_to_win = 12;
    Name = "We've got company!";
    description = "The blue creatures want to steal your grass!  Blast them with your gun!  Grow your wurm to length ${this.length_to_win} before the timer runs out to win!";
    quickObjectives ="Grow your wurm to length ${length_to_win}";
    //highScoreName: string;
}