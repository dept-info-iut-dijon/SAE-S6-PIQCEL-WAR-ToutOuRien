export class MoveHandler {
    private isDragging: boolean;
    private startX: number;
    private startY: number;
    private offsetX: number;
    private offsetY: number;
    private currentX: number;
    private currentY: number;
    private speed: number;

    public constructor() {
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.currentX = 0;
        this.currentY = 0;
        this.speed = 1;

        document.addEventListener("mousedown", this.onMouseDown.bind(this));
        document.addEventListener("mouseup", this.onMouseUp.bind(this));
        document.addEventListener("mousemove", this.onMouseMove.bind(this));
    }

    private onMouseDown(event: MouseEvent): void {
        this.isDragging = true;
        this.startX = event.clientX;
        this.startY = event.clientY;
    }

    private onMouseUp(event: MouseEvent): void {
        this.isDragging = false;
        this.offsetX += this.currentX;
        this.offsetY += this.currentY;
        this.currentX = 0;
        this.currentY = 0;
    }

    private onMouseMove(event: MouseEvent): void {
        if (!this.isDragging) return;

        this.currentX = (event.clientX - this.startX) / this.speed;
        this.currentY = (event.clientY - this.startY) / this.speed;
    }

    public get OffsetX(): number {
        return this.offsetX + this.currentX;
    }

    public get OffsetY(): number {
        return this.offsetY + this.currentY;
    }

    public UpdateSpeed(speed: number): void {
        this.speed = speed;
    }
}