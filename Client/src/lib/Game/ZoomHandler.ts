export class ZoomHandler {
    private targetZoom: number;
    private zoomFactor: number;
    private readonly speed: number;
    private lastTime: number;

    public constructor() {
        this.targetZoom = 1;
        this.zoomFactor = 1;
        this.speed = 10;
        this.lastTime = performance.now();
        this.UpdateLoop();

        document.addEventListener("wheel", this.OnScroll.bind(this));
    }

    public get ZoomFactor(): number { return this.zoomFactor; }

    private UpdateLoop(): void {
        const currentTime: number = performance.now();
        const deltaTime: number = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;
        this.UpdateZoomFactorToTarget(deltaTime);
        requestAnimationFrame(this.UpdateLoop.bind(this));
    }

    private UpdateZoomFactorToTarget(deltaTime: number): void {
        const difference: number = this.targetZoom - this.zoomFactor;
        this.zoomFactor += difference * this.speed * deltaTime;

        let isEnoughSufficientlyToUpdate: boolean = Math.abs(difference) < 0.001;

        if (isEnoughSufficientlyToUpdate)
            this.zoomFactor = this.targetZoom;
    }

    private OnScroll(event: WheelEvent): void {
        if (event.deltaY < 0) {
            this.ZoomIn();
        } else if (event.deltaY > 0) {
            this.ZoomOut();
        }
    }

    private ZoomIn(): void {
        this.targetZoom += this.zoomFactor * 0.1;
    }

    private ZoomOut(): void {
        this.targetZoom -= this.zoomFactor * 0.1;
    }
}