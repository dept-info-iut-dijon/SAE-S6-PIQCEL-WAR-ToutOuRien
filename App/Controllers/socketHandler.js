"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketHandler = void 0;
const databaseChoice_1 = require("../Data/databaseChoice");
const pixelDAO_1 = require("../Models/DAO/pixelDAO");
/**
 * Represents a class for handling socket-related operations in a pixel grid.
 */
class SocketHandler {
    /**
     * Creates a new instance of SocketHandler.
     * Initializes the pixelDAO property with a new instance of PixelDAO, using the provided database.
     */
    constructor() {
        let database = (0, databaseChoice_1.createDatabase)("sqlite");
        this.pixelDAO = new pixelDAO_1.PixelDAO(database);
    }
    /**
     * Changes the color of a pixel at the specified coordinates for a given user.
     * @param x - The x-coordinate of the pixel.
     * @param y - The y-coordinate of the pixel.
     * @param color - The new color for the pixel.
     * @param userID - The ID of the user making the change.
     */
    changePixel(x, y, color, userID) {
        this.pixelDAO.changePixelColor(x, y, color, userID);
    }
    /**
     * Initializes the grid by clearing all pixels and initializing them again.
     * @async
     */
    initGrid() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pixelDAO.clearAllPixels();
            this.pixelDAO.initPixels();
        });
    }
    /**
     * Retrieves all pixels from the database.
     * @async
     * @returns A Promise that resolves to an array of Pixel objects.
     */
    getAllPixels() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.pixelDAO.getAll();
        });
    }
}
exports.SocketHandler = SocketHandler;
