import {Game} from "@modules/Game/Domain/Game";
import {Pixel} from "@modules/Pixel/Domain/Pixel";

function GetRandomValueInRange(range: number): number {
    return Math.floor(Math.random() * range);
}

function GetRandomColor(): string {
    return `rgb(${GetRandomValueInRange(256)},${GetRandomValueInRange(256)},${GetRandomValueInRange(256)})`;
}

export function FillGameWithRandomPixels(): void {
    for (let i = 0; i < 3000; i++) {
        const newPixel: Pixel = new Pixel(
            i.toString(),
            GetRandomValueInRange(game.Width),
            GetRandomValueInRange(game.Height),
            GetRandomColor(),
            new Date(),
            "nobody"
        );
        game.AddPixel(newPixel);
    }
}

export let game: Game = new Game("game", 100, 100);
FillGameWithRandomPixels();