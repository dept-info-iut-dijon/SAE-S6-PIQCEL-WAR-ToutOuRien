import express from 'express';
import axios from 'axios';
import { AccountDAO } from '../Models/DAO/accountDAO';
import { createDatabase } from '../Data/databaseChoice';
import { Account } from '../Models/account';
import { User } from '../Models/user';
import { Session } from '../Models/session';
import { UserDAO } from '../Models/DAO/userDAO';
import { SessionDAO } from '../Models/DAO/sessionDAO';
import { Hash } from '../lib/Hash';
import * as cookie from 'cookie';
import nodemailer from 'nodemailer';

/**
 * The authentication controller handles operations related to user authentication.
 *
 * This class manages registration, login, logout, and other authentication-related features.
 * It typically interacts with the user model to validate credentials and maintain authentication state.
 *
 * @class Authentification
 */
class Authentification {
    private accountDAO: AccountDAO;
    private userDAO: UserDAO;
    private sessionDAO: SessionDAO;
    private generatedCode : string;

    /**
     * Constructor for the Authentification class.
     * Initializes instances of AccountDAO, UserDAO, and SessionDAO.
     */
    constructor() {
        let database = createDatabase("sqlite");
        this.accountDAO = new AccountDAO(database);
        this.userDAO = new UserDAO(database);
        this.sessionDAO = new SessionDAO(database);
        this.generatedCode = this.generateRandomCode();
    }

    /**
     * Allows us to know who is connected to the website.
     * @param req Express Request
     * @param res Express Response
     */
    public whoIsConnected(req: express.Request, res: express.Response): void {
        let token = req.cookies['token'];
        let session = this.sessionDAO.getSessionByToken(token);

        if (session != null) {
            res.status(200).json({
                success: true,
                message: 'Utilisateur connecté',
                session,
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Utilisateur non connecté',
            });
        }
    }

    /**
     * Allows a user to disconnect from the website.
     *
     * @param req - Express Request
     * @param res - Express Response
     */
    public logout(req: express.Request, res: express.Response): void {
        this.clearSessionCookie(res);
        this.deleteSession(req.cookies['token']);
        res.redirect('/');
    }

    /**
     * Handles the POST request for user signup.
     *
     * @param req - The HTTP request object containing user signup data.
     * @param res - The HTTP response object to send a response back to the client.
     */
    public async postsignup(req: express.Request, res: express.Response) {
        const { mail, psw, psw2, pseudo, 'g-recaptcha-response': captcha } = req.body;

        try {
            this.validateCaptcha(captcha);

            if (this.isMailInvalid(mail)) {
                this.handleInvalidMail(res);
            } else {
                this.validateMailFormat(mail);

                await this.validateAccount(mail, psw, psw2, pseudo);
                const hashedPassword = await Hash.hashPassword(psw);
                const account = await this.createAccountInDb(mail, pseudo, hashedPassword);

                if (account != null) {
                    this.sendAccessCode(mail);

                    this.handleSuccessAcc(res, 'Inscription réussie', account);
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                this.handleError(res, error.message);
            } else {
                this.handleError(res, 'An unexpected error occurred in the signup section.');
            }
        }
    }

    /**
     * Handles the POST request for user login.
     *
     * @param req - The HTTP request object containing user login data.
     * @param res - The HTTP response object to send a response back to the client.
     */
    public async postlogin(req: express.Request, res: express.Response) {
        const { mail, psw } = req.body;

        try {
            this.validateLoginInput(mail, psw);
            const account = await this.accountDAO.getAccountByMail(mail);
            if (account != null) {
                let session = await this.createSessionInDb(mail);
                
                if (session != null) {
                    this.handleSuccessAcc(res, 'Connexion réussie', account);
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                this.handleError(res, error.message);
            } else {
                this.handleError(res, 'An unexpected error occurred in the login section.');
            }
        }
    }

    private validateLoginInput(mail: string, psw: string): void {
        if (!mail || !psw) {
            throw new Error('Veuillez fournir une adresse e-mail et un mot de passe.');
        }

        const isAccountValid = this.isAccountValid(mail, psw);

        if (!isAccountValid) {
            throw new Error('Adresse e-mail ou mot de passe incorrect.');
        }
    }

    private async createAndSetSession(res: express.Response, mail: string, account: Account): Promise<void> {
        const dateNow = Date.now() + 86400;
        const token = await Hash.generateToken(mail, dateNow.toString());
        this.sessionDAO.create(new Session(0, token, dateNow, account));
        const session = await this.sessionDAO.getByID(await this.sessionDAO.getLastInsertedID());

        if (session !== null && session !== undefined) {
            this.setSessionCookie(res, session.Token);
            this.handleSuccess(res, 'Connexion réussie', session);
        } else {
            this.handleFailure(res, 'Une erreur est survenue');
        }
    }

    private async validateCaptcha(captcha: boolean): Promise<void> {
        const secretKey = '6LcUvrIoAAAAAFAPPi3cdZtxIPQ_lNHrJqcZviSA';
        const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
            params: {
                secret: secretKey,
                response: captcha,
            },
        });

        const data = response.data;

        if (!data.success) {
            throw new Error('Merci de valider le captcha');
        }
    }

    private handleInvalidMail(res: express.Response): void {
        res.status(400).json({
            success: false,
            message: 'Merci d\'entrer une adresse mail correcte'
        });
    }

    private validateMailFormat(mail: string): void {
        const regex = /^[a-zA-Z0-9._-]+@iut-dijon\.u-bourgogne\.fr$/;

        if (!regex.test(mail)) {
            throw new Error('Vous devez avoir un mail IUT de Dijon');
        }
    }

    private async validateAccount(mail: string, psw: string, psw2: string, pseudo: string): Promise<void> {
        let conditionMail = await this.accountDAO.checkExistingMails(mail);

        if (!conditionMail) {
            this.validatePassword(psw, psw2);
        } else {
            throw new Error("L'email rentré est déjà associé à un autre compte");
        }
    }

    private validatePassword(psw: string, psw2: string): void {
        let lenghtPassword = psw.length;
        const specialCharacter = /[!@#$%.]/;
        const numberPassword = /\d/;

        if (!(lenghtPassword >= 12 && specialCharacter.test(psw) && numberPassword.test(psw))) {
            throw new Error('Le mot de passe doit contenir 12 caractères, 1 caractère spécial, 1 chiffre');
        }

        if (psw !== psw2) {
            throw new Error('Vous devez retaper le même mot de passe');
        }
    }

    private isMailInvalid(mail: string): Boolean {
        return mail === '' || mail === null || mail === undefined;
    }

    private async isAccountValid(mail: string, psw: string): Promise<boolean> {
        let result = false;
        let mailValid = await this.accountDAO.checkExistingMails(mail);

        if (mailValid) {
            let account = await this.accountDAO.getAccountByMail(mail);

            if (account) {
                let passwordValid = await Hash.comparePassword(psw, account.Hash);

                if (passwordValid) {
                    result = true;
                }
            }
        }

        return result;
    }

    private handleError(res: express.Response, message: string): void {
        res.status(500).json({
            success: false,
            message,
        });
    }

    private handleSuccess(res: express.Response, message: string, session: Session): void {
        res.status(200).json({
            success: true,
            message,
            session,
        });
    }

    private handleSuccessAcc(res: express.Response, message: string, account: Account): void {
        res.status(200).json({
            success: true,
            message,
            account,
        });
    }

    private handleFailure(res: express.Response, message: string): void {
        res.status(400).json({
            success: false,
            message,
        });
    }

    private setSessionCookie(res: express.Response, token: string): void {
        res.cookie('token', token, {
            path: '/',
            httpOnly: true,
        });
    }

    private clearSessionCookie(res: express.Response): void {
        res.clearCookie('token');
    }

    private deleteSession(token: string): void {
        this.sessionDAO.deleteSessionByToken(token);
    }

    private async createUserInDb(firstName : string, lastName : string) : Promise<User|null>
    {
        this.userDAO.create(new User(0, firstName, lastName));
        let user = await this.userDAO.getByID(await this.userDAO.getLastInsertedID());
        return user; 
    }

    private async createAccountInDb(email : string, pseudo : string, hash : string) : Promise<Account|null>
    {
        let user = await this.createUserInDb("","");
        this.accountDAO.create(new Account(0, email, pseudo, hash, user));
        let account = await this.accountDAO.getByID(await this.accountDAO.getLastInsertedID());
        return account;
    }

    private async createSessionInDb(email : string) : Promise<Session|null>
    {
        let dateNow = Date.now();
        let account = await this.accountDAO.getAccountByMail(email);
        let token = await Hash.generateToken(email, dateNow.toString());

        this.sessionDAO.create(new Session(0, token, dateNow, account));
        let session = await this.sessionDAO.getByID(await this.sessionDAO.getLastInsertedID());
        return session;
    }

    private generateRandomCode() : string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    private sendAccessCode(email : string) : void {
        this.generatedCode = this.generateRandomCode();

        let mailer = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'lafronce444@gmail.com',
              pass: 'mmlq jmzs izpu jqxp',
            },
        });

        const mailOptions = {
            from: 'lafronce444@gmail.com',
            to: email,
            subject: 'Code d\'accès',
            text: `Votre code d'accès est : ${this.generatedCode}`,
        };

        mailer.sendMail(mailOptions);
    }

    /**
     * Checks if the entered code matches the generated access code.
     *
     * @param {string} enteredCode - The code entered by the user.
     * @returns {boolean} Returns true if the entered code is valid, otherwise false.
     */
    public isAccessCodeValid(enteredCode: string): boolean {
        return enteredCode === this.generatedCode;
    }
}

export { Authentification };