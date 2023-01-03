export class Counter {
    constructor(label) {
        this.Name = "none";
        this.Layer = -1;
        this.label = label;
        this.textbox = document.createElement("label");
        this.textbox.textContent = this.label;
        this.textbox.setAttribute("class", "counter");
    }
    set Value(v) {
        this.textbox.innerHTML = this.label + ":<br>" + v;
    }
    Update(timeStep) { }
}
//# sourceMappingURL=counter.js.map