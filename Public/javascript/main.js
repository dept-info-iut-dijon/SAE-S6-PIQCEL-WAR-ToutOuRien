import { Grid } from "./grid.js";
import { ColorSelector } from "./colorSelector.js";
import { socketManager } from "./socketManager.js";

const grid = new Grid(100, 100, "canvas");
const colorSelector = new ColorSelector("color-button");

canvas.addEventListener("click", function (event) {
    const col = Math.floor(event.offsetX / grid.cellWidth);
    const row = Math.floor(event.offsetY / grid.cellHeight);

    grid.setColor(col, row, colorSelector.getColorSelected());
    socketManager.sendPixelChange(col, row, colorSelector.getColorSelected(), 1);
});

//window.addEventListener("load", () => grid.drawGrid());
window.addEventListener("resize", () => grid.resizeCanvas());

socketManager.socket.on('pixelChange', (msg) => {
    grid.setColor(msg.xCoordinate, msg.yCoordinate, msg.pixelColor);
});

socketManager.socket.on('initGrid', (gridJson) => {
    grid.setupGrid(gridJson);
})