import { TimedLevel } from "./timedLevel.js";
export class FirstGrassEaterLevel extends TimedLevel {
    constructor() {
        super(...arguments);
        this.length_to_win = 12;
        this.Name = "We've got company!";
        this.description = "The blue creatures want to steal your grass!  Blast them with your gun!  Grow your wurm to length ${this.length_to_win} before the timer runs out to win!";
        this.quickObjectives = "Grow your wurm to length ${length_to_win}";
        //highScoreName: string;
    }
}
//# sourceMappingURL=firstGrassEaterLevel.js.map