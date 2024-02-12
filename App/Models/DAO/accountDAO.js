"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountDAO = void 0;
const Account_1 = require("../Account");
const userDAO_1 = require("./userDAO");
/**
 * The Account Data Access Object (DAO) for interacting with the database.
 * @author Mattéo BADET
 */
class AccountDAO {
    constructor(database) {
        this.database = database;
    }
    /**
     * Retrieves all accounts from the database.
     * @returns A promise that resolves to an array of Account objects.
     */
    getAll() {
        const userDAO = new userDAO_1.UserDAO(this.database);
        return this.database.queryAll("SELECT * FROM Account", []).then((response) => {
            const accountPromises = response.map((row) => {
                return userDAO.getByID(row.user_id).then((user) => {
                    return new Account_1.Account(row.id, row.email, row.pseudo, row.hash, user);
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
    getByID(id) {
        return this.database.queryOne("SELECT * FROM Account WHERE id = ?", [id]).then((response) => {
            let result = null;
            if (response) {
                const userDAO = new userDAO_1.UserDAO(this.database);
                result = userDAO.getByID(response.user_id).then((user) => {
                    return new Account_1.Account(response.id, response.email, response.pseudo, response.hash, user);
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
    create(account) {
        var _a, _b;
        return this.database.execute("INSERT INTO Account (email, pseudo, hash, user_id) VALUES (?, ?, ?, ?)", [
            account.Email,
            account.Pseudo,
            account.Hash,
            (_b = (_a = account.User) === null || _a === void 0 ? void 0 : _a.Id) !== null && _b !== void 0 ? _b : null
        ]);
    }
    /**
     * Updates account information in the database.
     * @param account - The Account object with updated information.
     * @returns A promise that resolves when the operation is complete.
     */
    edit(account) {
        var _a, _b;
        return this.database.execute("UPDATE Account SET email = ?, pseudo = ?, hash = ?, user_id = ? WHERE id = ?", [
            account.Email,
            account.Pseudo,
            account.Hash,
            (_b = (_a = account.User) === null || _a === void 0 ? void 0 : _a.Id) !== null && _b !== void 0 ? _b : null,
            account.Id,
        ]);
    }
    /**
     * Deletes an account from the database.
     * @param account - The Account object to be deleted.
     * @returns A promise that resolves when the operation is complete.
     */
    delete(account) {
        return this.database.execute("DELETE FROM Account WHERE id = ?", [account.Id]);
    }
    /**
     * Retrieves the last inserted ID from the Account table.
     * @returns A promise that resolves to the last inserted ID.
     */
    getLastInsertedID() {
        return this.database.queryOne("SELECT MAX(id) AS lastID FROM Account", []).then((response) => {
            let resultResponse = null;
            if (response && response.lastID !== null) {
                resultResponse = response.lastID;
            }
            else {
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
    checkCredentials(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.database.queryOne("SELECT * FROM account WHERE email = ?", [email]);
            const userDAO = new userDAO_1.UserDAO(this.database);
            let result = null;
            if (account.hash === password) {
                result = new Account_1.Account(account.id, account.email, account.pseudo, account.hash, yield userDAO.getByID(account.user_id));
            }
            return result;
        });
    }
    /**
     * Allows us to know if the mail exists in the database
     * @param mail the email to check
     * @returns promise boolean indicating if the mail exists or not
     */
    checkExistingMails(mail) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = false;
            const account = yield this.database.queryOne("SELECT email FROM account WHERE email=?", [mail]);
            if (account != undefined) {
                result = true;
            }
            return result;
        });
    }
    /**
     * Retrieves an account based on the provided email.
     *
     * @param mail The email associated with the account.
     * @returns A Promise that resolves to an instance of the Account class if the account is found, or null if not found.
     */
    getAccountByMail(mail) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.database.queryOne("SELECT * FROM Account WHERE email = ?", [mail]).then((response) => {
                let result = null;
                if (response) {
                    const userDAO = new userDAO_1.UserDAO(this.database);
                    result = userDAO.getByID(response.user_id).then((user) => {
                        return new Account_1.Account(response.id, response.email, response.pseudo, response.hash, user);
                    });
                    ;
                }
                return result;
            });
        });
    }
}
exports.AccountDAO = AccountDAO;
