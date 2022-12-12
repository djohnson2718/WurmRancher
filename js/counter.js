export class Counter {
    constructor(label) {
        this.label = label;
        this.textbox = document.createElement("label");
        this.textbox.textContent = this.label;
    }
    set Value(v) {
        this.textbox.textContent = this.label + ": " + v;
    }
}
//# sourceMappingURL=counter.js.map