import { IDatabase } from "../../Data/iDatabase";
import { User } from "../user";

/**
 * The User Data Access Object (DAO) for interacting with the database.
 * @author Mattéo BADET
 */
class UserDAO {
    private database: IDatabase;

    /**
     * Creates a new UserDAO instance.
     * @param database - The database instance to be used for data access.
     */
    constructor(database: IDatabase) {
        this.database = database;
    }

    /**
     * Fetches all users from the database.
     * @returns A promise that resolves to an array of User objects.
     */
    public getAll(): Promise<User[]> {
        return this.database.queryAll("SELECT * FROM user", []).then((response) =>
            response.map((row: any) => new User(row.id, row.lastName, row.firstName))
        );
    }

    /**
     * Retrieves a user by their ID.
     * @param id - The ID of the user to fetch.
     * @returns A promise that resolves to a User object, or null if not found.
     */
    public getByID(id: number): Promise<User | null> {
        return this.database.queryOne("SELECT * FROM user WHERE Id = ?", [id]).then((response) =>
            response ? new User(response.id, response.lastName, response.firstName) : null
        );
    }


    /**
     * Creates a new user in the database.
     * @param user - The User object to be added to the database.
     * @returns A promise that resolves when the operation is complete.
     */
    public create(user: User): Promise<void> {
        return this.database.execute("INSERT INTO user (firstname, lastname) VALUES (?, ?)", [
            user.FirstName,
            user.LastName,
        ]);
    }

    /**
     * Updates a user's information in the database.
     * @param user - The User object with updated information.
     * @returns A promise that resolves when the operation is complete.
     */
    public edit(user: User): Promise<void> {
        return this.database.execute("UPDATE user SET firstname = ?, lastname = ? WHERE id = ?", [
            user.FirstName,
            user.LastName,
            user.Id,
        ]);
    }

    /**
     * Deletes a user from the database.
     * @param user - The User object to be deleted.
     * @returns A promise that resolves when the operation is complete.
     */
    public delete(user: User): Promise<void> {
        return this.database.execute("DELETE FROM user WHERE id = ?", [user.Id]);
    }

    /**
     * Retrieves the last inserted ID from the User table.
     * @returns A promise that resolves to the last inserted ID.
     */
    public getLastInsertedID(): Promise<number> {
        return this.database.queryOne("SELECT MAX(id) AS lastID FROM user", []).then((response) => {
            let resultResponse = null;
            if (response && response.lastID !== null) {
                resultResponse = response.lastID;
            } else {
                resultResponse = Promise.reject(new Error("Aucun ID inséré n'a été trouvé."));
            }
            return resultResponse;
        });
    }
}

export { UserDAO };
