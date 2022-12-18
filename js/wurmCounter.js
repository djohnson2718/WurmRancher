import { Counter } from "./counter.js";
export class WurmCounter extends Counter {
    constructor(wurm, label = "Wurm length") {
        super(label);
        this.Name = "WurmCounter";
        this.Layer = -1;
        this.wurm = wurm;
    }
    Update() {
        this.Value = this.wurm.Length;
    }
}
//# sourceMappingURL=wurmCounter.js.map