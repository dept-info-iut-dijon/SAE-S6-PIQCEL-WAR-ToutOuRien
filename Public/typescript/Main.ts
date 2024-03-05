import { Grid } from "./Grid.js";
import { ColorSelector } from "./ColorSelector.js";
import { socketManager } from "./SocketManager.js";

const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
const grid = new Grid(100, 100, "canvas");
const colorSelector = new ColorSelector(document.getElementById("color-selector") as HTMLInputElement);

if (canvas) {
    canvas.addEventListener("click", function (event) {
        if (grid.Canvas && grid.CellWidth && grid.CellHeight) {
            const col = Math.floor(event.offsetX / grid.CellWidth);
            const row = Math.floor(event.offsetY / grid.CellHeight);

            grid.SetColor(col, row, colorSelector.Color);
            socketManager.sendPixelChange(col, row, colorSelector.Color, 1);
        }
    });
}

//window.addEventListener("load", () => grid.drawGrid());
window.addEventListener("resize", () => {
    if (grid.Canvas) {
        grid.ResizeCanvas();
    }
});

socketManager.Socket.on('pixelChange', (msg: { xCoordinate: number, yCoordinate: number, pixelColor: string }) => {
    grid.SetColor(msg.xCoordinate, msg.yCoordinate, msg.pixelColor);
});

socketManager.Socket.on('initGrid', (gridJson: { xCoordinate: number, yCoordinate: number, pixelColor: string }[]) => {
    grid.SetupGrid(gridJson);
});