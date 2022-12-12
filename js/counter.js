export class Counter {
    constructor(label) {
        this.textbox = new HTMLLabelElement();
        this.label = label;
    }
    set Value(v) {
        this.textbox.textContent = this.label + ": " + v;
    }
}
//# sourceMappingURL=counter.js.map