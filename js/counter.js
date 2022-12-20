export class Counter {
    constructor(label) {
        this.Name = "none";
        this.Layer = -1;
        this.label = label;
        this.textbox = document.createElement("label");
        this.textbox.textContent = this.label;
    }
    set Value(v) {
        this.textbox.textContent = this.label + ": " + v;
    }
    Update(timeStep) { }
}
//# sourceMappingURL=counter.js.map