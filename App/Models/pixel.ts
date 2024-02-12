import { User } from "./user";

/**
 * Represent a pixel on the canvas
 * @property xCoordinate : x coordinate of the pixel
 * @property yCoordinate : y coordinate of the pixel
 * @property pixelColor : color of the pixel
 * @property userTarget : user who targeted the pixel
 */
class Pixel
{

    private xCoordinate : number;
    private yCoordinate : number;
    private pixelColor : string;
    private userTarget : User | null;

    /**
     * constructor
     * @param x coordinate x of the pixel
     * @param y coordinate y of the pixel
     * @param color color of the pixel
     * @param user user who targeted the pixel
     */
    constructor(x: number, y: number, color: string, user: User | null){
        this.xCoordinate = x;
        this.yCoordinate = y;
        this.pixelColor = color;
        this.userTarget = user;
    }

    /**
     * Getter XCoordinate
     * @return {number}
     */
	public get XCoordinate(): number {
		return this.xCoordinate;
	}

    /**
     * Getter YCoordinate
     * @return {number}
     */
	public get YCoordinate(): number {
		return this.yCoordinate;
	}

    /**
     * Getter PixelColor
     * @return {string}
     */
	public get PixelColor(): string {
		return this.pixelColor;
	}

    /**
     * Getter UserTarget
     * @return {User}
     */
	public get UserTarget(): User | null {
		return this.userTarget;
	}

    /**
     * Setter XCoordinate
     * @param {number} value
     */
	public set XCoordinate(value: number) {
		this.xCoordinate = value;
	}

    /**
     * Setter $yCoordinate
     * @param {number} value
     */
	public set $yCoordinate(value: number) {
		this.yCoordinate = value;
	}

    /**
     * Setter $pixelColor
     * @param {string} value
     */
	public set $pixelColor(value: string) {
		this.pixelColor = value;
	}

    /**
     * Setter $userTarget
     * @param {User} value
     */
	public set $userTarget(value: User) {
		this.userTarget = value;
	}
}

export { Pixel }