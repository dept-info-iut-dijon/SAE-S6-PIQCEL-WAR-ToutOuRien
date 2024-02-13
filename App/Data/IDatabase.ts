/**
 * Represents an interface for defining the contract of a database connection.
 */
export interface IDatabase {

    /**
     * Connects to the MySQL database.
     * @async
     * @returns A Promise that resolves when the connection is successful.
     */
    connect(): Promise<void>;

    /**
     * Executes a SQL query and returns the first result.
     * @async
     * @param req - The SQL query string.
     * @param params - An array of parameters for the query.
     * @returns A Promise that resolves to the first result of the query.
     */
    queryOne(req: string, params: any[]): Promise<any>;

    /**
     * Executes a SQL query and returns all results.
     * @async
     * @param req - The SQL query string.
     * @param params - An array of parameters for the query.
     * @returns A Promise that resolves to an array of results.
     */
    queryAll(req: string, params: any[]): Promise<any[]>;

    /**
     * Executes a SQL query without returning any results.
     * @async
     * @param req - The SQL query string.
     * @param params - An array of parameters for the query.
     * @returns A Promise that resolves when the query is successful.
     */
    execute(req: string, params: any[]): Promise<void>;

    /**
     * Closes the database connection.
     */
    close(): void;

    /**
     * Checks if the database connection is established and authenticated.
     * @returns A boolean indicating whether the database is connected.
     */
    IsConnected(): boolean;
}
