/**
 * Class User.
 * 
 * This class represents a user with the following properties:
 * @property {number} id - The unique identifier of the user.
 * @property {string} lastName - The last name of the user.
 * @property {string} firstName - The first name of the user.
 */
class User {
    private id: number;
    private lastName: string;
    private firstName: string;
    
    /**
     * Constructor: Initializes a new instance of the User class.
     * @param {number} id - The unique identifier of the user.
     * @param {string} lastName - The last name of the user.
     * @param {Date} firstName - The first name of the user.
     */
    constructor(id: number, lastName : string, firstName : string) {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
    }

    /**
     * Gets the unique identifier of the user.
     * @returns {number} - The user's ID.
     */
    get Id(): number {
        return this.id;
    }
    
    /**
     * Sets the unique identifier of the user.
     * @param {number} value - The new value for the user's ID.
     */
    set Id(value: number) {
        this.id = value;
    }

    /**
     * Gets the last name of the user.
     * @returns {string} - The user's last name.
     */
    get LastName(): string {
        return this.lastName;
    }
    
    /**
     * Sets the last name of the user.
     * @param {string} value - The new value for the user's last name.
     */
    set LastName(value: string) {
        this.lastName = value;
    }
    
    /**
     * Gets the first name of the user.
     * @returns {string} - The user's first name.
     */
    get FirstName(): string {
        return this.firstName;
    }
    
    /**
     * Sets the first name of the user.
     * @param {string} value - The new value for the user's first name.
     */
    set FirstName(value: string) {
        this.firstName = value;
    }
}

export { User };