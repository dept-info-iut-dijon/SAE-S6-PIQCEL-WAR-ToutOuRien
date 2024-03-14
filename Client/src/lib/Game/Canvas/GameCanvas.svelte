<script lang="ts">
    import {onMount} from "svelte";
    import type {IGameView} from "./IGameView";
    import type {Game} from "@modules/Game/Domain/Game";
    import {ZoomHandler} from "./ZoomHandler";
    import {MoveHandler} from "$lib/Game/Canvas/MoveHandler";
    import {Pixel} from "@modules/Pixel/Domain/Pixel";
    import {Position} from "$lib/Game/Canvas/Position";
    import {pixelSelected} from "$lib/Game/Stores/PixelSelected";

    export let game: Game;

    let canvasContainer: HTMLDivElement;
    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;
    let relativePixelSize: number = 1;
    let centerX: number;
    let centerY: number;
    let finalGameWidth: number;
    let finalGameHeight: number;
    let zoomHandler: ZoomHandler = new ZoomHandler();
    let moveHandler: MoveHandler = new MoveHandler();

    $: if (game) {
        InitialiseComponent();
    }

    function InitialiseComponent(): void {
        Resize();
        UpdateLoop();
    }

    function CalculateRelativePixelSize(): void {
        if (!game)
            return;

        let relativeWidth = canvas.width / game.Width;
        let relativeHeight = canvas.height / game.Height;

        relativePixelSize = Math.min(relativeWidth, relativeHeight) * zoomHandler.ZoomFactor;
    }

    const view: IGameView = {
        DrawPixel(x: number, y: number, color: string): void {
            DrawRectangle(x * relativePixelSize, y * relativePixelSize, relativePixelSize, relativePixelSize, color);
        }
    };

    function DrawRectangle(x: number, y: number, width: number, height: number, color: string): void {
        context.fillStyle = color;

        let screenPosition: Position = ToScreenPosition(x, y);

        context.fillRect(screenPosition.X, screenPosition.Y, width, height);
    }

    function ToScreenPosition(x: number, y: number): Position {
        let screenX: number = x + centerX - finalGameWidth / 2 + moveHandler.OffsetX * zoomHandler.ZoomFactor;
        let screenY: number = y + centerY - finalGameHeight / 2 + moveHandler.OffsetY * zoomHandler.ZoomFactor;
        return new Position(screenX, screenY);
    }

    function ToGamePosition(x: number, y: number): Position {
        let gameX: number = x - centerX + finalGameWidth / 2 - moveHandler.OffsetX * zoomHandler.ZoomFactor;
        let gameY: number = y - centerY + finalGameHeight / 2 - moveHandler.OffsetY * zoomHandler.ZoomFactor;
        return new Position(gameX, gameY);
    }

    function LoadSelectedPixel(x: number, y: number): void {
        let gamePosition: Position = ToGamePosition(x, y);

        gamePosition.X = Math.floor(gamePosition.X / relativePixelSize);
        gamePosition.Y = Math.floor(gamePosition.Y / relativePixelSize);

        if (gamePosition.X >= 0 && gamePosition.X < game.Width && gamePosition.Y >= 0 && gamePosition.Y < game.Height) {
            let colorData = context.getImageData(x, y, 1, 1).data;
            let color: string = `rgb(${colorData[0]}, ${colorData[1]}, ${colorData[2]})`;
            $pixelSelected = Pixel.Create(gamePosition.X, gamePosition.Y, color, "");
        }
    }

    function OnCanvasClick(event: MouseEvent): void {
        switch (event.button) {
            case 0:
                if ($pixelSelected)
                    pixelSelected.set($pixelSelected);
                LoadSelectedPixel(event.offsetX, event.offsetY);
                break;
            case 2:
                $pixelSelected = null;
                break;
        }
    }

    function UpdateLoop(): void {
        if (!game)
            requestAnimationFrame(UpdateLoop);
        else {
            RefreshCanvas();
            moveHandler.UpdateSpeed(zoomHandler.ZoomFactor);
            Draw();
            requestAnimationFrame(UpdateLoop);
        }
    }

    function Draw(): void {
        DrawRectangle(0, 0, finalGameWidth, finalGameHeight, "white");

        for (const pixel of game.Pixels) {
            view.DrawPixel(pixel.X, pixel.Y, pixel.Color);
        }

        if ($pixelSelected) {
            let scale: number = 1.11;
            let width: number = relativePixelSize;
            let scaleWidth: number = width * scale;
            let offset: number = (scaleWidth - width) / 2;
            let x: number = $pixelSelected.X * relativePixelSize;
            let y: number = $pixelSelected.Y * relativePixelSize;
            // noinspection JSSuspiciousNameCombination
            DrawRectangle(x - offset, y - offset, width * scale, width * scale, "gray");
            DrawRectangle(x, y, width, width, $pixelSelected.Color);
        }
    }

    function RefreshCanvas(): void {
        context.clearRect(0, 0, canvas.width, canvas.height);
        CalculateRelativePixelSize();
        finalGameWidth = game.Width * relativePixelSize;
        finalGameHeight = game.Height * relativePixelSize;
    }

    onMount(() => {
        context = canvas.getContext('2d')!;
    });

    function Resize(): void {
        canvas.width = canvasContainer.clientWidth;
        canvas.height = canvasContainer.clientHeight;

        CalculateRelativePixelSize();

        centerX = canvas.width / 2;
        centerY = canvas.height / 2;
    }

    window.onresize = () => {
        Resize();
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