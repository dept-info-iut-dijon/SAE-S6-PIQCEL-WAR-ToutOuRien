"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PixelDAO = void 0;
const pixel_1 = require("../pixel");
const userDAO_1 = require("./userDAO");
/**
 * Represents a Data Access Object (DAO) for interacting with pixel data in the database.
 */
class PixelDAO {
    /**
     * Creates a new instance of the PixelDAO class.
     * @param database - The Database instance to be used for pixel-related queries.
     */
    constructor(database) {
        this.database = database;
    }
    /**
     * Retrieves all pixels from the database along with their associated users.
     * @returns A Promise that resolves to an array of Pixel objects.
     */
    getAll() {
        const userDAO = new userDAO_1.UserDAO(this.database);
        return this.database.queryAll("SELECT * FROM pixel", []).then((response) => Promise.all(response.map((row) => userDAO.getByID(row.targetUser).then((user) => new pixel_1.Pixel(row.xCoordinate, row.yCoordinate, row.pixelColor, user)))));
    }
    /**
     * Clears all pixels from the database.
     * @returns A Promise that resolves when the operation is successful.
     */
    clearAllPixels() {
        return this.database.execute("DELETE FROM pixel", []);
    }
    /**
     * Initializes pixels in the database with default values.
     */
    initPixels() {
        for (let i = 0; i < 100; i++) {
            for (let j = 0; j < 100; j++) {
                this.database.execute("INSERT INTO pixel VALUES (?,?,?,?)", [i, j, "white", 0]);
            }
        }
    }
    /**
     * Changes the color of a pixel at specified coordinates for a given user.
     * @param x - The x-coordinate of the pixel.
     * @param y - The y-coordinate of the pixel.
     * @param color - The new color for the pixel.
     * @param userID - The ID of the user making the change.
     * @returns A Promise that resolves when the operation is successful.
     */
    changePixelColor(x, y, color, userID) {
        return this.database.execute("UPDATE pixel SET pixelColor=?, targetUser=? WHERE xCoordinate=? AND yCoordinate=?", [
            color,
            userID,
            x,
            y
        ]);
    }
}
exports.PixelDAO = PixelDAO;
