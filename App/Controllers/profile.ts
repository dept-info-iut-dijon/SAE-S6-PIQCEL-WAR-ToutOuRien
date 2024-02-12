import express from 'express';
import { createDatabase } from '../Data/databaseChoice'
import { AccountDAO } from "../Models/DAO/accountDAO";

/**
 * Search the profile in database
 * 
 * @class Profile
 */
class Profile {

    private accountDAO : AccountDAO;

    /**
     * Constructor
     * 
     * Initializes an instance of the `Profile` class with a database connection.
     */
    constructor() { 
        let database = createDatabase("sqlite");
        this.accountDAO = new AccountDAO(database);
    }

    /**
     * Get nickname and email in database
     * 
     * @param req - The HTTP request object containing user login data.
     * @param res - The HTTP response object to send a response back to the client.
     */
    public async getProfile(req: express.Request, res: express.Response) {
        try {
            const profileInfo = await this.accountDAO.getByID(2);
    
            if (profileInfo) {
                // Stockez les données du profil dans un objet
                const profileData = {
                    Pseudo: profileInfo.Pseudo,
                    Email: profileInfo.Email
                };
                // Envoyez l'objet de données à la vue
                res.locals.profileData = profileData;
            } else {
                // Gérez le cas où le profil n'est pas trouvé
                res.locals.profileData = null; // Vous pouvez définir cela comme null ou un objet vide, selon votre logique
                res.status(404).json({ error: 'Profile not found' });
            }
        } catch (error) {
            // Gérez les erreurs
            res.status(500).send('Erreur interne du serveur');
        }
    }
    
}

export { Profile };