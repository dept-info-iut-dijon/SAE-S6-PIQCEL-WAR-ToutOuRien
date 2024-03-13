import {Game} from "@modules/Game/Domain/Game";
import {IPixel} from "@modules/Pixel/Domain/IPixel";
import {Pixel} from "@modules/Pixel/Domain/Pixel";

describe("Game", () => {
    let pixel1: IPixel;
    let pixel2: IPixel;

    beforeEach(() => {
        pixel1 = new Pixel(0, 0, 0, "color", new Date(), 0);
        pixel2 = new Pixel(1, 0, 0, "color", new Date(), 0);
    });

    it("should initialize with empty pixels and pixelsHistory", () => {
        const game = new Game("test");
        // using jest test for empty array
        expect(game.Pixels).toEqual([]);
        expect(game.PixelsHistory).toEqual(new Map());
    });

    it("should add pixel to pixels and pixelsHistory", () => {
        const game = new Game("test");
        game.AddPixel(pixel1);
        expect(game.Pixels).toContain(pixel1);
        expect(game.PixelsHistory.get(pixel1.Date)).toEqual(pixel1);
    });

    it("should load multiple pixels to pixels and pixelsHistory", () => {
        const game = new Game("test");
        const pixels: Array<IPixel> = [pixel1, pixel2];
        game.LoadPixels(pixels);
        expect(game.Pixels).toContain(pixels[0]);
        expect(game.Pixels).toContain(pixels[1]);
        pixels.forEach(p => expect(game.PixelsHistory.get(p.Date)).toEqual(p));
    });
});