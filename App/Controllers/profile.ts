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
        console.log("^^ test oui oui")
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
    }

    /**
     * Set the profile in the view
     */
    public setProfile(){

    }
}

export { Profile };