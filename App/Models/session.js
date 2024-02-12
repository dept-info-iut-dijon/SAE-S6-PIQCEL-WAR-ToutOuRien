"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
/**
 * Class Session.
 *
 * This class represents a user session with the following properties:
 * @property {number} id - The unique identifier of the session.
 * @property {string} token - The session token used for authentication.
 * @property {Date} creationDate - The date and time when the session was created.
 * @property {Account | null} account - Reference to the associated Account object or null if no account is associated.
 */
class Session {
    /**
     * Constructor: Initializes a new instance of the Session class.
     * @param {number} id - The unique identifier of the session.
     * @param {string} token - The session token used for authentication.
     * @param {Date} creationDate - The date and time when the session was created.
     * @param {Account | null} account - Reference to the associated Account object or null if no account is associated.
     */
    constructor(id, token, creationDate, account) {
        this.id = id;
        this.token = token;
        this.creationDate = creationDate;
        this.account = account;
    }
    /**
     * Gets the unique identifier of the session.
     * @returns {number} - The session ID.
     */
    get Id() {
        return this.id;
    }
    /**
     * Sets the unique identifier of the session.
     * @param {number} value - The new value for the session ID.
     */
    set Id(value) {
        this.id = value;
    }
    /**
     * Gets the session token used for authentication.
     * @returns {string} - The session token.
     */
    get Token() {
        return this.token;
    }
    /**
     * Sets the session token used for authentication.
     * @param {string} value - The new value for the session token.
     */
    set Token(value) {
        this.token = value;
    }
    /**
     * Gets the date and time when the session was created.
     * @returns {number} - The creation date of the session.
     */
    get CreationDate() {
        return this.creationDate;
    }
    /**
     * Sets the date and time when the session was created.
     * @param {number} value - The new value for the creation date of the session.
     */
    set CreationDate(value) {
        this.creationDate = value;
    }
    /**
     * Gets the reference to the associated Account object.
     * @returns {Account | null} - The Account object associated with the session or null if no account is associated.
     */
    get Account() {
        return this.account;
    }
    /**
     * Sets the reference to the associated Account object.
     * @param {Account | null} value - The new value for the associated Account object or null if no account is associated.
     */
    set Account(value) {
        this.account = value;
    }
}
exports.Session = Session;
