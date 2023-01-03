import { Level } from "./level.js";
import { Intro } from "./theme.js";
import { Wurm } from "./wurm.js";

export class IntroDemo extends Level
{
    NoUserControl = true;

    QuickObjectives = "";

    constructor(){
        super(Intro);
    }

    InitializeLevel(): void {
        super.InitializeLevel();
        new Wurm(46, 100, 370);
        console.log("made a wurm");
    }

}