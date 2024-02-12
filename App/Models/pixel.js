"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pixel = void 0;
/**
 * Represent a pixel on the canvas
 * @property xCoordinate : x coordinate of the pixel
 * @property yCoordinate : y coordinate of the pixel
 * @property pixelColor : color of the pixel
 * @property userTarget : user who targeted the pixel
 */
class Pixel {
    /**
     * constructor
     * @param x coordinate x of the pixel
     * @param y coordinate y of the pixel
     * @param color color of the pixel
     * @param user user who targeted the pixel
     */
    constructor(x, y, color, user) {
        this.xCoordinate = x;
        this.yCoordinate = y;
        this.pixelColor = color;
        this.userTarget = user;
    }
    /**
     * Getter XCoordinate
     * @return {number}
     */
    get XCoordinate() {
        return this.xCoordinate;
    }
    /**
     * Getter YCoordinate
     * @return {number}
     */
    get YCoordinate() {
        return this.yCoordinate;
    }
    /**
     * Getter PixelColor
     * @return {string}
     */
    get PixelColor() {
        return this.pixelColor;
    }
    /**
     * Getter UserTarget
     * @return {User}
     */
    get UserTarget() {
        return this.userTarget;
    }
    /**
     * Setter XCoordinate
     * @param {number} value
     */
    set XCoordinate(value) {
        this.xCoordinate = value;
    }
    /**
     * Setter $yCoordinate
     * @param {number} value
     */
    set $yCoordinate(value) {
        this.yCoordinate = value;
    }
    /**
     * Setter $pixelColor
     * @param {string} value
     */
    set $pixelColor(value) {
        this.pixelColor = value;
    }
    /**
     * Setter $userTarget
     * @param {User} value
     */
    set $userTarget(value) {
        this.userTarget = value;
    }
}
exports.Pixel = Pixel;
