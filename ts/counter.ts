export class Counter{
    textbox : HTMLLabelElement;
    label : string;

    constructor(label : string){
        this.label = label;
        this.textbox = document.createElement("label");
        this.textbox.textContent = this.label;
    }
    set Value(v : string){
        this.textbox.textContent = this.label + ": " + v;
    }
}