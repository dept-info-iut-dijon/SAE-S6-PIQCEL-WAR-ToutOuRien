import {Entity} from "@modules/Entity/Domain/Entity";
import {IPixel} from "../../Pixel/Domain/IPixel";
import {IGame} from "@modules/Game/Domain/IGame";
import {Type} from "class-transformer";
import {ExposeProperties} from "@modules/Kernel/Decorators/ExposeProperties";
import {Pixel} from "@modules/Pixel/Domain/Pixel";

/**
 * Represents the game entity which contains all the pixels set by users.
 */
@ExposeProperties()
export class Game extends Entity implements IGame {
    private readonly pixels: Array<IPixel>;
    @Type(() => Map) private readonly pixelsHistory: Map<Date, IPixel>;
    private readonly width: number;
    private readonly height: number;

    public constructor(identifier: string, width: number, height: number) {
        super(identifier);
        this.pixels = new Array<IPixel>();
        this.pixelsHistory = new Map<Date, IPixel>();
        this.width = width;
        this.height = height;
    }

    public get Pixels(): Array<IPixel> { return this.pixels; }
    public get PixelsHistory(): Map<Date, IPixel> { return this.pixelsHistory; }
    public get Width(): number { return this.width; }
    public get Height(): number { return this.height; }

    /**
     * Adds a pixel to the game.
     * @param pixel - The pixel to add.
     */
    public AddPixel(pixel: IPixel): void {
        this.pixels.push(pixel);
        this.pixelsHistory.set(pixel.Date, pixel);
    }

    /**
     * Uploads a list of pixels to the game.
     * @param pixels - The pixels to upload.
     */
    public UploadPixels(pixels: Array<IPixel>): void {
        this.pixels.push(...pixels);
        pixels.forEach(p => this.pixelsHistory.set(p.Date, p));
    }
}