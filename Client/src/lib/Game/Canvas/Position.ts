/**
 * Represents a position on the canvas.
 */
export class Position {
    private x: number;
    private y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public get X(): number { return this.x; }
    public set X(value: number) { this.x = value; }
    public get Y(): number { return this.y; }
    public set Y(value: number) { this.y = value; }
}