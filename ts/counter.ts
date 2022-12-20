import { GameElement } from "./gameElement.js";

export class Counter implements GameElement{
    textbox : HTMLLabelElement;
    label : string;

    constructor(label : string){
        this.label = label;
        this.textbox = document.createElement("label");
        this.textbox.textContent = this.label;
    }
    set Value(v : number | string){
        this.textbox.textContent = this.label + ": " + v;
    }

    Update(timeStep :number): void{}
    Name = "none";
    Layer =-1;

}