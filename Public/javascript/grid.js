/**
 * Class representing a grid.
 * @class
 */
class Grid {
    /**
     * Constructor for the Grid class.
     * @constructor
     * @param {number} rows - The number of rows in the grid.
     * @param {number} cols - The number of columns in the grid.
     * @param {string} canvasId - The ID of the canvas element in the DOM.
     */
    constructor(rows, cols, canvasId) {
        this.rows = rows;
        this.cols = cols;

        this.canvas = document.getElementById(canvasId);

        this.defineSize();
        this.context = this.canvas.getContext("2d");

        this.cellWidth = 0;
        this.cellHeight = 0;
        this.defineCellSize();

        this.grid = [];
    }

    /**
     * Set up the canvas size.
     * @private
     */
    setupCanvas() { 
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
    }

    /**
     * Initializes the grid with the provided JSON data.
     * This method creates a visual representation of the grid on a canvas.
     *
     * @param {Array} gridJson - JSON data for initializing the grid.
     *                           Each element must have the following properties:
     *                           - xCoordinate: The X-coordinate of the pixel.
     *                           - yCoordinate: The Y-coordinate of the pixel.
     *                           - pixelColor: The color of the pixel.
     *                           - userTarget: The user that change the pixel.
     */
    setupGrid(gridJson) {
        for (let index = 0; index < this.cols; index++) {
            this.grid[index] = [];
        }

        for (let index = 0; index < gridJson.length; index++) {
            const element = gridJson[index];
            this.grid[element.xCoordinate][element.yCoordinate] = {x: element.xCoordinate, y: element.yCoordinate, color: element.pixelColor};
        }

        this.setupCanvas();
        this.setupEventListeners();
        this.drawGrid();
    }

    /**
     * Calculate cell size based on canvas size.
     * @private
     */
    defineCellSize(){
        this.cellWidth = this.canvasWidth / this.cols;
        this.cellHeight = this.canvasHeight / this.rows;
    }

    /**
     * Set up event listeners.
     * @private
     */
    setupEventListeners() {
        window.addEventListener("resize", () => this.resizeCanvas());
    }

    /**
     * Draw the grid on the canvas.
     * @private
     */
    drawGrid() {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                const cell = this.grid[i][j];
                this.context.fillStyle = cell.color;
                this.context.fillRect(cell.x * this.cellWidth, cell.y * this.cellHeight, this.cellWidth, this.cellHeight);
            }
        }
    }

    /**
     * Define the canvas size based on the window.
     * @private
     */
    defineSize() {
        const minDimension = Math.min(window.innerWidth, window.innerHeight);
        const canvasSize = minDimension / 1.5;
        this.canvasWidth = canvasSize;
        this.canvasHeight = canvasSize;
    }

    /**
     * Resize the canvas and redraw the grid accordingly.
     * @private
     */
    resizeCanvas() {
        this.defineSize();
        this.defineCellSize()
        this.setupCanvas();
        this.drawGrid();    
    }

    /**
     * Change the color of a specific cell in the grid.
     * @param {number} col - The column index of the cell.
     * @param {number} row - The row index of the cell.
     * @param {string} color - The color to set for the cell.
     * @public
     */
    setColor(col, row, color) {
        if (this.grid[col] && this.grid[col][row]) {
            this.grid[col][row].color = color;

            const cell = this.grid[col][row];
            this.context.fillStyle = cell.color;
            this.context.fillRect(cell.x * this.cellWidth, cell.y * this.cellHeight, this.cellWidth, this.cellHeight);

            // Cooldown of 5 seconds
            this.cooldownVerification(5000);
        }
    }

    /**
     * Give and display a cooldown to place a pixel on the Canva for user
     * @param {number} delay - Time of the cooldown
     * @private
     */
    cooldownVerification(delay) {
        const timerContent = document.getElementById('timer');
        const canvasContainer = document.getElementById('canvas-container');
    
        // Disable pointer events for the canvas initially
        canvasContainer.style.pointerEvents = 'none';
    
        // Display the timer
        timerContent.style.display = 'block';
    
        // Update the cooldown display
        timerContent.textContent = 'Temps avant la pose d\'un nouveau pixel : ' + delay / 1000 + ' secondes.';
    
        // Set up an interval to update the timer display and check for cooldown completion
        const intervalId = setInterval(() => {
            delay -= 1000;
    
            // Update the timer display with each decrement of the delay
            timerContent.textContent = 'Temps avant la pose d\'un nouveau pixel : ' + delay / 1000 + ' secondes.';
    
            // Check if the delay has reached zero
            if (delay <= 0) {
                // Stop the interval
                clearInterval(intervalId);
    
                // Re-enable pointer events for the canvas
                canvasContainer.style.pointerEvents = 'auto';
                
                // Return to initial display
                timerContent.textContent = 'Vous pouvez poser un pixel !';
            }
        }, 1000);
    }
}

// Export the Grid class
export { Grid };