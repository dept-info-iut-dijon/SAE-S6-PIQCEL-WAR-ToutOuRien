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
                const profileInfo = yield this.accountDAO.getByID(2);
                if (profileInfo) {
                    // Stockez les données du profil dans un objet
                    const profileData = {
                        Pseudo: profileInfo.Pseudo,
                        Email: profileInfo.Email
                    };
                    // Envoyez l'objet de données à la vue
                    res.locals.profileData = profileData;
                }
                else {
                    // Gérez le cas où le profil n'est pas trouvé
                    res.locals.profileData = null; // Vous pouvez définir cela comme null ou un objet vide, selon votre logique
                    res.status(404).json({ error: 'Profile not found' });
                }
            }
            catch (error) {
                // Gérez les erreurs
                res.status(500).send('Erreur interne du serveur');
            }
        });
    }
}
exports.Profile = Profile;
