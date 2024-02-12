import { IDatabase } from "../../Data/iDatabase";
import { Session } from "../session";
import { AccountDAO } from "./accountDAO";

/**
 * The Session Data Access Object (DAO) for interacting with the database.
 * @author Mattéo BADET
 */
class SessionDAO {
    private database: IDatabase;

    /**
     * Constructor
     * @param database - The Database instance to be used for session-related queries.
     */
    constructor(database: IDatabase) {
        this.database = database;
    }

    /**
     * Retrieves all sessions from the database.
     * @returns A promise that resolves to an array of Session objects.
     */
    public getAll(): Promise<Session[]> {
        const accountDAO = new AccountDAO(this.database);

        return this.database.queryAll("SELECT * FROM Session", []).then((response) =>
            Promise.all(
                response.map((row: any) =>
                    accountDAO.getByID(row.account_id).then((account) => new Session(row.id, row.token, row.creationDate, account))
                )
            )
        );
    }

    /**
     * Retrieves a session by its ID.
     * @param id - The ID of the Session to fetch.
     * @returns A promise that resolves to a Session object, or null if not found.
     */
    public getByID(id: number): Promise<Session | null> {
        return this.database.queryOne("SELECT * FROM Session WHERE Id = ?", [id]).then((response) => {
            let result = null;
            if (response) {
                const accountDAO = new AccountDAO(this.database);
                result = accountDAO.getByID(response.account_id).then((account) => new Session(response.id, response.token, response.creationDate, account));
            }
            return result;
        });
    }


    /**
     * Creates a new session in the database.
     * @param session - The Session object to be added to the database.
     * @returns A promise that resolves when the operation is complete.
     */
    public create(session: Session): Promise<void> {
        return this.database.execute("INSERT INTO Session (token, creationDate, account_id) VALUES (?, ?, ?)", [
            session.Token,
            session.CreationDate,
            session.Account?.Id ?? null,
        ]);
    }

    /**
     * Updates session information in the database.
     * @param session - The Session object with updated information.
     * @returns A promise that resolves when the operation is complete.
     */
    public edit(session: Session): Promise<void> {
        return this.database.execute("UPDATE Session SET token = ?, creationDate = ?, account_id = ? WHERE id = ?", [
            session.Token,
            session.CreationDate,
            session.Account?.Id ?? null,
            session.Id,
        ]);
    }

    /**
     * Deletes a session from the database.
     * @param session - The Session object to be deleted.
     * @returns A promise that resolves when the operation is complete.
     */
    public delete(session: Session): Promise<void> {
        return this.database.execute("DELETE FROM Session WHERE id = ?", [session.Id]);
    }

    /**
     * Retrieves the last inserted ID from the Session table.
     * @returns A promise that resolves to the last inserted ID.
     */
    public getLastInsertedID(): Promise<number> {
        return this.database.queryOne("SELECT MAX(id) AS lastID FROM Session", []).then((response) => {
            let resultResponse = null;
            if (response && response.lastID !== null) {
                resultResponse = response.lastID;
            } else {
                resultResponse = Promise.reject(new Error("Aucun ID inséré n'a été trouvé."));
            }
            return resultResponse;
        });
    }

    /**
     * Delete a session from the database thanks to its token
     * @param token The token of the session
     * @returns A promise that resolves when the operation is complete.
     */
    public deleteSessionByToken(token : string) : Promise<void>
    {
        return this.database.execute("DELETE FROM Session WHERE token = ?", [token]);
    }

    /**
     * Retrieves a session by its Token.
     * @param id - The token of the Session to fetch.
     * @returns A promise that resolves to a Session object, or null if not found.
     */
    public getSessionByToken(token : string) : Promise<Session | null>
    {
        return this.database.queryOne("SELECT * FROM Session WHERE token = ?", [token]).then((response) => {
            let result = null;
            if (response) {
                const accountDAO = new AccountDAO(this.database);
                result = accountDAO.getByID(response.account_id).then((account) => new Session(response.id, response.token, response.creationDate, account));
            }

            return result;
        });
    }
}

export { SessionDAO };
