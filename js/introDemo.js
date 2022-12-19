import { Level } from "./level.js";
import { Intro } from "./theme.js";
import { Wurm } from "./wurm.js";
export class IntroDemo extends Level {
    constructor() {
        super(Intro);
        this.NoUserControl = true;
        this.QuickObjectives = "";
    }
    InitializeLevel() {
        super.InitializeLevel();
        new Wurm(28, 100, 370);
        console.log("made a wurm");
    }
}
//# sourceMappingURL=introDemo.js.map