import { Counter } from "./counter.js";
import { GameElement } from "./gameElement.js";
import { Wurm } from "./wurm.js";

export class WurmCounter extends Counter implements GameElement{
    wurm : Wurm;
    Name = "WurmCounter";
    Layer = -1;
    constructor(wurm : Wurm, label : string = "Wurm length"){
        super(label);
        this.wurm = wurm;
    }

    Update() : void{
        this.Value = this.wurm.Length;
    }
}