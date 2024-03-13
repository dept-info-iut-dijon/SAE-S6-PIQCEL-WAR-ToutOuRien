import { IPixel } from "./IPixel";
import {Entity} from "@modules/Entity/Domain/Entity";

/**
 * Represent a pixel.
 */
export class Pixel extends Entity implements IPixel {
    private readonly x: number;
    private readonly y: number;
    private readonly color : string;
    private readonly date: Date;
	private readonly ownerId: string;

    public constructor(identifier: string, x: number, y: number, color: string, date: Date, ownerId: string) {
        super(identifier);
        this.x = x;
        this.y = y;
        this.color = color;
        this.date = date;
        this.ownerId = ownerId;
    }

	public get X(): number { return this.x; }
	public get Y(): number { return this.y; }
	public get Color(): string { return this.color; }
    public get Date(): Date { return this.date; }
	public get OwnerId(): string { return this.ownerId; }
}