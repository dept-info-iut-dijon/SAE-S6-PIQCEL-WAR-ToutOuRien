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

    /**
     * Add a pixel to the game
     */
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

    onMount(async () => {
        game = await gameController.CreateGame(100, 100) as Game;
        console.log(game);
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