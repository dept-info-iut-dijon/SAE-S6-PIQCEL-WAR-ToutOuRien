<script lang="ts">
    import {onMount} from "svelte";
    import type {IGameView} from "./IGameView";
    import type {Game} from "@modules/Game/Domain/Game";
    import {ZoomHandler} from "./ZoomHandler";
    import type {SocketManager} from "$lib/SocketIo/SocketManager";
    import {MoveHandler} from "$lib/Game/MoveHandler";

    let canvasContainer: HTMLDivElement;
    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;

    export let game: Game;
    let relativePixelSize: number = 1;

    let zoomHandler: ZoomHandler = new ZoomHandler();
    let moveHandler: MoveHandler = new MoveHandler();

    function CalculateRelativePixelSize(): void {
        let relativeWidth = canvas.width / game.Width;
        let relativeHeight = canvas.height / game.Height;

        relativePixelSize = Math.min(relativeWidth, relativeHeight) * zoomHandler.ZoomFactor;
    }

    const view: IGameView = {
        DrawPixel(x: number, y: number, color: string): void {
            context.fillStyle = color;

            let centerX = canvas.width / 2;
            let centerY = canvas.height / 2;

            let finalGameWidth = game.Width * relativePixelSize;
            let finalGameHeight = game.Height * relativePixelSize;

            let screenX = x * relativePixelSize + centerX - finalGameWidth / 2 + moveHandler.OffsetX * zoomHandler.ZoomFactor;
            let screenY = y * relativePixelSize + centerY - finalGameHeight / 2 + moveHandler.OffsetY * zoomHandler.ZoomFactor;

            context.fillRect(screenX, screenY, relativePixelSize, relativePixelSize);
        }
    };

    function AddPixel(x: number, y: number, color: string): void {
        // use the socket
    }

    function OnCanvasClick(): void {

    }

    function UpdateLoop(): void {
        RefreshCanvas();

        moveHandler.UpdateSpeed(zoomHandler.ZoomFactor);
        for (const pixel of game.Pixels)
            view.DrawPixel(pixel.X, pixel.Y, pixel.Color);

        requestAnimationFrame(UpdateLoop);
    }

    function RefreshCanvas(): void {
        context.clearRect(0, 0, canvas.width, canvas.height);
        CalculateRelativePixelSize();
    }

    onMount(() => {
        context = canvas.getContext('2d')!;
        canvas.width = canvasContainer.clientWidth;
        canvas.height = canvasContainer.clientHeight;
        CalculateRelativePixelSize();
        UpdateLoop();
    });

    window.addEventListener("wheel", function(event) {
        if (event.deltaY < 0) {
            zoomHandler.ZoomIn();
        } else if (event.deltaY > 0) {
            zoomHandler.ZoomOut();
        }
    });

    window.onresize = () => {
        canvas.width = canvasContainer.clientWidth;
        canvas.height = canvasContainer.clientHeight;
        CalculateRelativePixelSize();
    };
</script>

<div id="canvas-container" bind:this={canvasContainer}>
    <canvas id="canvas" bind:this={canvas} on:click={OnCanvasClick}></canvas>
</div>

<style>
    #canvas-container {
        position: relative;
        width: 100%;
        height: 100%;
        margin: 0;
    }
</style>