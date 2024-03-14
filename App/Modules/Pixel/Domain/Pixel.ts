import { IPixel } from "./IPixel";
import {Entity} from "@modules/Entity/Domain/Entity";
import {UndefinedIdentifier} from "@modules/Entity/Domain/UndefinedIdentifier";
import {ExposeProperties} from "@modules/Kernel/Decorators/ExposeProperties";

/**
 * Represent a pixel.
 */
@ExposeProperties()
export class Pixel extends Entity implements IPixel {
    private x: number;
    private y: number;
    private color : string;
    private date: Date;
	private ownerId: string;

    public constructor(identifier: string, x: number, y: number, color: string, date: Date, ownerId: string) {
        super(identifier);
        this.x = x;
        this.y = y;
        this.color = color;
        this.date = date;
        this.ownerId = ownerId;
    }

    /**
     * Factory method to create a pixel without identifiers.
     * @param x - The x coordinate.
     * @param y - The y coordinate.
     * @param color - The color.
     * @param ownerId - The owner identifier.
     */
    public static Create(x: number, y: number, color: string, ownerId: string): Pixel {
        return new Pixel("", x, y, color, new Date(), ownerId);
    }

	public get X(): number { return this.x; }
    public set X(value: number) { this.x = value; }

	public get Y(): number { return this.y; }
    public set Y(value: number) { this.y = value; }

	public get Color(): string { return this.color; }
    public set Color(value: string) { this.color = value; }

    public get Date(): Date { return this.date; }
    public set Date(value: Date) { this.date = value; }

	public get OwnerId(): string { return this.ownerId; }
    public set OwnerId(value: string) { this.ownerId = value; }
}