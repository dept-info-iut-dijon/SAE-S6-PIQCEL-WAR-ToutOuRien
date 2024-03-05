export class ColorSelector {
    color;
    selector;
    constructor(selector) {
        this.selector = selector;
        this.color = selector.value;
        this.selector.addEventListener("change", (event) => this.onColorChanged(event));
    }
    onColorChanged(event) {
        this.color = this.selector.value;
    }
    get Color() {
        return this.color;
    }
}
//# sourceMappingURL=ColorSelector.js.map