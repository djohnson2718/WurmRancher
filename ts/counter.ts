export class Counter{
    textbox = new HTMLLabelElement();
    label : string;

    constructor(label : string){
        this.label = label;
    }
    set Value(v : string){
        this.textbox.textContent = this.label + ": " + v;
    }
}