export class ColorSelector {
    private color:string;
    private selector: HTMLInputElement;

    public constructor(selector:HTMLInputElement) {
        this.selector = selector;
        this.color = selector.value;
        this.selector.addEventListener("change", (event:Event) => this.onColorChanged(event));
    }

    public onColorChanged(event:Event) {
        this.color = this.selector.value;
    }

    public get Color(): string {
        return this.color;
    }
}
