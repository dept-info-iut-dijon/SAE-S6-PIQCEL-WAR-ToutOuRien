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
exports.Profile = void 0;
const databaseChoice_1 = require("../Data/databaseChoice");
const accountDAO_1 = require("../Models/DAO/accountDAO");
/**
 * Search the profile in database
 *
 * @class Profile
 */
class Profile {
    /**
     * Constructor
     *
     * Initializes an instance of the `Profile` class with a database connection.
     */
    constructor() {
        let database = (0, databaseChoice_1.createDatabase)("sqlite");
        this.accountDAO = new accountDAO_1.AccountDAO(database);
        console.log("^^ sale fils de  eeeeee");
    }
    /**
     * Get nickname and email in database
     *
     * @param req - The HTTP request object containing user login data.
     * @param res - The HTTP response object to send a response back to the client.
     */
    getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profileInfo = yield this.accountDAO.getByID(req.body.ID);
                if (profileInfo) {
                    const { Pseudo, Email } = profileInfo;
                    res.status(200).json({ Pseudo, Email });
                }
                else {
                    res.status(404).json({ error: 'Profile not found' });
                }
                return profileInfo;
            }
            catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    /**
     * Set the profile in the view
     */
    setProfile() {
    }
}
exports.Profile = Profile;
