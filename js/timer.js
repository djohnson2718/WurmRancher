import { Counter } from "./counter.js";
import { FramesToRealTime } from "./timing.js";
export class Timer extends Counter {
    constructor(level) {
        super("Time left");
        this.Name = "Timer";
        this.Layer = -1;
        this.level = level;
    }
    Update() {
        this.Value = FramesToRealTime(this.level.frames_left).toFixed(1);
    }
}
//# sourceMappingURL=timer.js.map