import { IDatabase } from "../../Data/iDatabase";
import { Account } from "../Account";
import { UserDAO } from "./userDAO";

/**
 * The Account Data Access Object (DAO) for interacting with the database.
 * @author Mattéo BADET
 */
class AccountDAO {
    private database: IDatabase;

    constructor(database: IDatabase) {
        this.database = database;
    }

    /**
     * Retrieves all accounts from the database.
     * @returns A promise that resolves to an array of Account objects.
     */
    public getAll(): Promise<Account[]> {
        const userDAO = new UserDAO(this.database);

        return this.database.queryAll("SELECT * FROM Account", []).then((response) => {
            const accountPromises = response.map((row: any) => {
                return userDAO.getByID(row.user_id).then((user) => {
                    return new Account(row.id, row.email, row.pseudo, row.hash, user);
                });
            });

            return Promise.all(accountPromises);
        });
    }

    /**
     * Retrieves an account by its ID.
     * @param id - The ID of the account to fetch.
     * @returns A promise that resolves to an Account object, or null if not found.
     */
    public getByID(id: number): Promise<Account | null> {
        return this.database.queryOne("SELECT * FROM Account WHERE id = ?", [id]).then((response) => {
            let result = null;
            if (response) {
                const userDAO = new UserDAO(this.database);
                result = userDAO.getByID(response.user_id).then((user) => {
                    return new Account(response.id, response.email, response.pseudo, response.hash, user);
                });
            }
            return result;
        });
    }

    /**
     * Creates a new account in the database.
     * @param account - The Account object to be added to the database.
     * @returns A promise that resolves when the operation is complete.
     */
    public create(account: Account): Promise<void> {
        return this.database.execute("INSERT INTO Account (email, pseudo, hash, user_id) VALUES (?, ?, ?, ?)", [
            account.Email,
            account.Pseudo,
            account.Hash,
            account.User?.Id ?? null
        ]);
    }

    /**
     * Updates account information in the database.
     * @param account - The Account object with updated information.
     * @returns A promise that resolves when the operation is complete.
     */
    public edit(account: Account): Promise<void> {
        return this.database.execute("UPDATE Account SET email = ?, pseudo = ?, hash = ?, user_id = ? WHERE id = ?", [
            account.Email,
            account.Pseudo,
            account.Hash,
            account.User?.Id ?? null,
            account.Id,
        ]);
    }

    /**
     * Deletes an account from the database.
     * @param account - The Account object to be deleted.
     * @returns A promise that resolves when the operation is complete.
     */
    public delete(account: Account): Promise<void> {
        return this.database.execute("DELETE FROM Account WHERE id = ?", [account.Id]);
    }

    /**
     * Retrieves the last inserted ID from the Account table.
     * @returns A promise that resolves to the last inserted ID.
     */
    public getLastInsertedID(): Promise<number> {
        return this.database.queryOne("SELECT MAX(id) AS lastID FROM Account", []).then((response) => {
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
     * Checks if the provided email and password match records in the database.
     * @param email - The email to check.
     * @param password - The password to check.
     * @returns A promise that resolves to an account object if the credentials are valid, or null if not found or invalid.
     */
    public async checkCredentials(email: string, password: string): Promise<Account | null> {
        const account = await this.database.queryOne("SELECT * FROM account WHERE email = ?", [email]);
        const userDAO = new UserDAO(this.database);
        let result = null;

        if (account.hash === password) {
            result = new Account(account.id, account.email, account.pseudo, account.hash, await userDAO.getByID(account.user_id));
        } 
        return result;
    }

    /**
     * Allows us to know if the mail exists in the database
     * @param mail the email to check
     * @returns promise boolean indicating if the mail exists or not
     */
    public async checkExistingMails(mail: string) : Promise<boolean> {
        let result : boolean = false;
        const account = await this.database.queryOne("SELECT email FROM account WHERE email=?", [mail]);
        if(account != undefined){
            result = true;
        }
        return result;
    }

    /**
     * Retrieves an account based on the provided email.
     *
     * @param mail The email associated with the account.
     * @returns A Promise that resolves to an instance of the Account class if the account is found, or null if not found.
     */
    public async getAccountByMail(mail: string) : Promise<Account|null> 
    {
        return this.database.queryOne("SELECT * FROM Account WHERE email = ?", [mail]).then((response) => {
            let result = null;
            if (response) {
                const userDAO = new UserDAO(this.database);
                result = userDAO.getByID(response.user_id).then((user) => {
                    return new Account(response.id, response.email, response.pseudo, response.hash, user);
                });;
            }
            return result;
        });
    }
}

export { AccountDAO };
