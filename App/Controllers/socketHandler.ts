import { CreateDatabase } from "../Data/DatabaseChoice";
import { PixelDAO } from "../Models/DAO/pixelDAO";
import { Pixel } from "../Models/Pixel";

/**
 * Represents a class for handling socket-related operations in a pixel grid.
 */
class SocketHandler{
    private pixelDAO : PixelDAO;

    /**
     * Creates a new instance of SocketHandler.
     * Initializes the pixelDAO property with a new instance of PixelDAO, using the provided database.
     */
    constructor() {
        let database = CreateDatabase("sqlite");
        this.pixelDAO = new PixelDAO(database);
    }

    /**
     * Changes the color of a pixel at the specified coordinates for a given user.
     * @param x - The x-coordinate of the pixel.
     * @param y - The y-coordinate of the pixel.
     * @param color - The new color for the pixel.
     * @param userID - The ID of the user making the change.
     */
    public changePixel(x : number, y : number, color : string, userID : number){
        this.pixelDAO.changePixelColor(x,y,color,userID);
    }

    /**
     * Initializes the grid by clearing all pixels and initializing them again.
     * @async
     */
    public async initGrid() {
        await this.pixelDAO.clearAllPixels();
        this.pixelDAO.initPixels();
    }

    /**
     * Retrieves all pixels from the database.
     * @async
     * @returns A Promise that resolves to an array of Pixel objects.
     */
    public async getAllPixels() : Promise<Pixel[]> {
        return await this.pixelDAO.getAll();
    }
}

export { SocketHandler }