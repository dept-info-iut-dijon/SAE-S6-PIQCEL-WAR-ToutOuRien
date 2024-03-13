import express from 'express';
import { CreateDatabase } from '../Data/DatabaseChoice'
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
        let database = CreateDatabase("sqlite");
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
            const profileInfo = await this.accountDAO.getByID(req.body.ID);
    
            if (profileInfo) {
                const profileData = {
                    Pseudo: profileInfo.Pseudo,
                    Email: profileInfo.Email
                };

                res.locals.profileData = profileData;
            } else {
                res.locals.profileData = null;
                res.status(404).json({ error: 'Profile not found' });
            }
        } catch (error) {
            res.status(500).send('Erreur interne du serveur');
        }
    }
}

export { Profile };