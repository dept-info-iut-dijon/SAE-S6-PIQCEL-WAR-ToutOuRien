import { Account } from './account';

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
    private id: number;
    private token: string;
    private creationDate: number;
    private account: Account | null;

    /**
     * Constructor: Initializes a new instance of the Session class.
     * @param {number} id - The unique identifier of the session.
     * @param {string} token - The session token used for authentication.
     * @param {Date} creationDate - The date and time when the session was created.
     * @param {Account | null} account - Reference to the associated Account object or null if no account is associated.
     */
    constructor(id : number, token: string, creationDate: number, account: Account | null) {
      this.id = id;
      this.token = token;
      this.creationDate = creationDate;
      this.account = account;
    }

    /**
     * Gets the unique identifier of the session.
     * @returns {number} - The session ID.
     */
    get Id(): number {
        return this.id;
    }
  
    /**
     * Sets the unique identifier of the session.
     * @param {number} value - The new value for the session ID.
     */
    set Id(value: number) {
        this.id = value;
    }
  
    /**
     * Gets the session token used for authentication.
     * @returns {string} - The session token.
     */
    get Token(): string {
        return this.token;
    }
  
    /**
     * Sets the session token used for authentication.
     * @param {string} value - The new value for the session token.
     */
    set Token(value: string) {
        this.token = value;
    }
  
    /**
     * Gets the date and time when the session was created.
     * @returns {number} - The creation date of the session.
     */
    get CreationDate(): number {
        return this.creationDate;
    }
  
    /**
     * Sets the date and time when the session was created.
     * @param {number} value - The new value for the creation date of the session.
     */
    set CreationDate(value: number) {
        this.creationDate = value;
    }

    /**
     * Gets the reference to the associated Account object.
     * @returns {Account | null} - The Account object associated with the session or null if no account is associated.
     */
    get Account(): Account | null {
        return this.account;
    }
  
    /**
     * Sets the reference to the associated Account object.
     * @param {Account | null} value - The new value for the associated Account object or null if no account is associated.
     */
    set Account(value: Account | null) {
        this.account = value;
    }
}

export { Session };
