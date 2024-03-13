/**
 * Represents a class that handles the zooming of the game.
 */
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

    /**
     * Update loop method that will be called every frame.
     */
    private UpdateLoop(): void {
        const currentTime: number = performance.now();
        const deltaTime: number = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;
        this.UpdateZoomFactorToTarget(deltaTime);
        requestAnimationFrame(this.UpdateLoop.bind(this));
    }

    /**
     * Updates the zoom factor to the target zoom factor.
     * @param deltaTime - The time between the last frame and the current frame.
     */
    private UpdateZoomFactorToTarget(deltaTime: number): void {
        const difference: number = this.targetZoom - this.zoomFactor;
        this.zoomFactor += difference * this.speed * deltaTime;

        let isEnoughSufficientlyToUpdate: boolean = Math.abs(difference) < 0.001;

        if (isEnoughSufficientlyToUpdate)
            this.zoomFactor = this.targetZoom;
    }

    /**
     * Event handler for the wheel event.
     * @param event - The wheel event.
     */
    private OnScroll(event: WheelEvent): void {
        if (event.deltaY < 0) {
            this.ZoomIn();
        } else if (event.deltaY > 0) {
            this.ZoomOut();
        }
    }

    /**
     * Zooms in the game.
     */
    private ZoomIn(): void {
        this.targetZoom += this.zoomFactor * 0.1;
    }

    /**
     * Zooms out the game.
     */
    private ZoomOut(): void {
        this.targetZoom -= this.zoomFactor * 0.1;
    }
}