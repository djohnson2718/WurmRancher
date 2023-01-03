import { GameElement } from "./gameElement.js";

export class Counter implements GameElement{
    textbox : HTMLLabelElement;
    label : string;

    constructor(label : string){
        this.label = label;
        this.textbox = document.createElement("label");
        this.textbox.textContent = this.label;
        this.textbox.setAttribute("class","counter");
    }
    set Value(v : number | string){
        this.textbox.innerHTML = this.label + ":<br>" + v;
    }

    Update(timeStep :number): void{}
    Name = "none";
    Layer =-1;

}