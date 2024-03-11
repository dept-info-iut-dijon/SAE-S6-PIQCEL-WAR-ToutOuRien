import { User } from './User';

/**
 * Class Account.
 * 
 * This class represents a user account with the following properties:
 * @property {number} id - Account's unique identifier.
 * @property {string} email - Account's email address.
 * @property {string} hash - Account's password hash.
 * @property {User} user - Reference to the associated User object.
 */
class Account {
    private id: number;
    private email: string;
    private pseudo: string;
    private hash: string;
    private user: User | null;

    /**
     * Constructor: Initializes a new instance of the Account class.
     * @param {number} id - The unique identifier of the account.
     * @param {string} email - Account's email address.
     * @param {string} pseudo - Account's pseudo (alternative username or nickname).
     * @param {string} hash - Account's password hash.
     * @param {number} salt - Account's password salt.
     * @param {User | null} user - Reference to the associated User object or null if no user is associated.
     */
    constructor(id : number, email: string, pseudo: string, hash: string, user: User | null) {
        this.id = id;
        this.email = email;
        this.pseudo = pseudo;
        this.hash = hash;
        this.user = user;
    }

    /**
     * Gets the unique identifier of the account.
     * @returns {number} - The account ID.
     */
    get Id(): number {
        return this.id;
    }

    /**
     * Sets the unique identifier of the account.
     * @param {number} value - The new value for the account ID.
     */
    set Id(value: number) {
        this.id = value;
    }

    /**
     * Gets the email address associated with the account.
     * @returns {string} - The account's email address.
     */
    get Email(): string {
        return this.email;
    }

    /**
     * Sets the email address associated with the account.
     * @param {string} value - The new value for the account's email address.
     */
    set Email(value: string) {
        this.email = value;
    }

    /**
     * Sets the pseudo associated with the account.
     * @param {string} value - The new value for the account's pseudo.
     */
    get Pseudo(): string {
        return this.pseudo;
    }

    /**
     * Gets the pseudo (alternative username or nickname) associated with the account.
     * @returns {string} - The account's pseudo.
     */
    set Pseudo(value: string) {
        this.pseudo = value;
    }

    /**
     * Gets the password hash associated with the account.
     * @returns {string} - The account's password hash.
     */
    get Hash(): string {
        return this.hash;
    }

    /**
     * Sets the password hash associated with the account.
     * @param {string} value - The new value for the account's password hash.
     */
    set Hash(value: string) {
        this.hash = value;
    }

    /**
     * Gets the reference to the associated User object.
     * @returns {User | null} - The User object associated with the account or null if no user is associated.
     */
    get User(): User | null {
        return this.user;
    }

    /**
     * Sets the reference to the associated User object.
     * @param {User | null} value - The new value for the associated User object or null if no user is associated.
     */
    set User(value: User | null) {
        this.user = value;
    }
}

export { Account };