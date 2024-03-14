<script lang="ts">
    import PixelPanel from "$lib/Game/PixelPanel.svelte";
    import GameCanvas from "$lib/Game/Canvas/GameCanvas.svelte";
    import {gameController} from "$lib/main";
    import {onMount} from "svelte";
    import type {Game} from "@modules/Game/Domain/Game";
    import {pixelSelected} from "$lib/Game/Stores/PixelSelected";
    import {Pixel} from "@modules/Pixel/Domain/Pixel";
    import type {IAddPixelDto} from "@modules/Game/Application/IAddPixelDto";

    let game: Game;

    async function AddPixel(): Promise<void> {
        if ($pixelSelected === null)
            return;

        let addPixelDto: IAddPixelDto = {
            GameId: game.Identifier,
            X: $pixelSelected.X,
            Y: $pixelSelected.Y,
            Color: $pixelSelected.Color,
            OwnerId: $pixelSelected.OwnerId
        }

        await gameController.AddPixel(addPixelDto);
    }

    function GetRandomValueInRange(range: number): number {
        return Math.floor(Math.random() * range);
    }

    function GetRandomColor(): string {
        return `rgb(${GetRandomValueInRange(256)},${GetRandomValueInRange(256)},${GetRandomValueInRange(256)})`;
    }

    async function FillGameWithRandomPixels(game: Game): Promise<void> {
        for (let i = 0; i < 25; i++) {
            const newPixel: Pixel = new Pixel(
                i.toString(),
                GetRandomValueInRange(game.Width),
                GetRandomValueInRange(game.Height),
                GetRandomColor(),
                new Date(),
                ""
            );

            let addPixelDto: IAddPixelDto = {
                GameId: game.Identifier,
                X: newPixel.X,
                Y: newPixel.Y,
                Color: newPixel.Color,
                OwnerId: newPixel.OwnerId
            }

            await gameController.AddPixel(addPixelDto);
        }
    }

    onMount(async () => {
        game = await gameController.CreateGame(100, 100) as Game;
        console.log(game);
        //await FillGameWithRandomPixels(game);
    })
</script>

<PixelPanel {AddPixel}></PixelPanel>
<GameCanvas game={game}></GameCanvas>

<style>
    :global(html, body) {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
</style>