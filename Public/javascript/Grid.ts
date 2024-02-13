/**
 * Class representing a grid.
 * @class
 */
class Grid {
    private readonly canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D | null = null;

    private cellWidth: number = 0;
    private cellHeight: number = 0;

    private canvasWidth: number = 0;
    private canvasHeight: number = 0;

    private readonly rows: number;
    private readonly cols: number;

    private grid: { x: number, y: number, color: string }[][] = [];

    /**
     * Constructor for the Grid class.
     * @constructor
     * @param {number} rows - The number of rows in the grid.
     * @param {number} cols - The number of columns in the grid.
     * @param {string} canvasId - The ID of the canvas element in the DOM.
     */
    constructor(rows: number, cols: number, canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.cols = cols;
        this.rows = rows;

        if (this.canvas) {
            this.context = this.canvas.getContext("2d");
        }

        this.DefineSize();
        this.DefineCellSize();

        for (let index = 0; index < this.cols; index++) {
            this.grid[index] = [];
        }
    }

    /**
     * Set up the canvas size.
     * @private
     */
    private SetupCanvas() {
        if (this.context) {
            this.canvas.width = this.canvasWidth;
            this.canvas.height = this.canvasHeight;
        }
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
    public SetupGrid(gridJson: IGridElementDto[]) {
        for (let index = 0; index < this.cols; index++) {
            this.grid[index] = [];
        }

        for (let index = 0; index < gridJson.length; index++) {
            const element = gridJson[index];
            this.grid[element.xCoordinate][element.yCoordinate] = {x: element.xCoordinate, y: element.yCoordinate, color: element.pixelColor};
        }

        this.SetupCanvas();
        this.SetupEventListeners();
        this.DrawGrid();
    }

    private SetupEventListeners() {
        window.addEventListener("resize", () => this.ResizeCanvas());
    }
    /**
     * Draw the grid on the canvas.
     * @private
     */
    private DrawGrid() {
        if (this.context) {
            for (let i = 0; i < this.cols; i++) {
                for (let j = 0; j < this.rows; j++) {
                    const cell = this.grid[i][j];
                    this.context.fillStyle = cell.color;
                    this.context.fillRect(cell.x * this.cellWidth, cell.y * this.cellHeight, this.cellWidth, this.cellHeight);
                }
            }
        }
    }

    /**
     * Define the canvas size based on the window.
     * @private
     */
    private DefineSize() {
        const minDimension = Math.min(window.innerWidth, window.innerHeight);
        const canvasSize = minDimension / 1.5;
        this.canvasWidth = canvasSize;
        this.canvasHeight = canvasSize;
    }

    /**
     * Calculate cell size based on canvas size.
     * @private
     */
    private DefineCellSize() {
        this.cellWidth = this.canvasWidth / this.cols;
        this.cellHeight = this.canvasHeight / this.rows;
    }

    public ResizeCanvas(){
        this.DefineSize();
        this.DefineCellSize();
        this.SetupCanvas();
        this.DrawGrid();
    }

    public SetColor(col:number, row:number, color:string) {
        if (this.grid[col] && this.grid[col][row] && this.context) {
            this.grid[col][row].color = color;

            const cell = this.grid[col][row];
            this.context.fillStyle = cell.color;
            this.context.fillRect(cell.x * this.cellWidth, cell.y * this.cellHeight, this.cellWidth, this.cellHeight);

            // Cooldown of 5 seconds
            this.CooldownVerification(5000);
        }
    }

    /**
     * Give and display a cooldown to place a pixel on the Canva for user
     * @param {number} delay - Time of the cooldown
     * @private
     */
    private CooldownVerification(delay:number) {
        const timerContent = document.getElementById('timer') as HTMLElement;
        const canvasContainer = document.getElementById('canvas-container') as HTMLFormElement;

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

    /**
     * Getter for cell width.
     * @returns {number} The width of each cell.
     */
    public get CellWidth(): number {
        return this.cellWidth;
    }

    /**
     * Getter for cell height.
     * @returns {number} The height of each cell.
     */
    public get CellHeight(): number {
        return this.cellHeight;
    }

    /**
     * Getter for canvas element.
     * @returns {HTMLCanvasElement | null} The canvas element.
     */
    public get Canvas(): HTMLCanvasElement | null {
        return this.canvas;
    }
}

// Export the Grid class
export { Grid };
