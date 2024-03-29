import { Counter } from "./counter.js";
export class Timer extends Counter {
    constructor(level) {
        super("Time left");
        this.Name = "Timer";
        this.Layer = -1;
        this.level = level;
    }
    Update(timeStep) {
        if (this.level.time_allowed < this.level.elapsed_time)
            this.Value = "0.0";
        else
            this.Value = ((this.level.time_allowed - this.level.elapsed_time) / 1000).toFixed(1);
    }
}
//# sourceMappingURL=timer.js.map