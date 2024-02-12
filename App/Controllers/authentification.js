"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authentification = void 0;
const axios_1 = __importDefault(require("axios"));
const accountDAO_1 = require("../Models/DAO/accountDAO");
const databaseChoice_1 = require("../Data/databaseChoice");
const account_1 = require("../Models/account");
const user_1 = require("../Models/user");
const session_1 = require("../Models/session");
const userDAO_1 = require("../Models/DAO/userDAO");
const sessionDAO_1 = require("../Models/DAO/sessionDAO");
const Hash_1 = require("../lib/Hash");
const cookie = __importStar(require("cookie"));
const nodemailer_1 = __importDefault(require("nodemailer"));
/**
 * The authentication controller handles operations related to user authentication.
 *
 * This class manages registration, login, logout, and other authentication-related features.
 * It typically interacts with the user model to validate credentials and maintain authentication state.
 *
 * @class Authentification
 */
class Authentification {
    /**
     * Constructor for the Authentification class.
     * Initializes instances of AccountDAO, UserDAO, and SessionDAO.
     */
    constructor() {
        let database = (0, databaseChoice_1.createDatabase)("sqlite");
        this.accountDAO = new accountDAO_1.AccountDAO(database);
        this.userDAO = new userDAO_1.UserDAO(database);
        this.sessionDAO = new sessionDAO_1.SessionDAO(database);
        this.generatedCode = this.generateRandomCode();
    }
    /**
     * Allows a user to disconnect from the website.
     *
     * @param req - Express Request
     * @param res - Express Response
     */
    logout(req, res) {
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
    postsignup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { mail, psw, psw2, pseudo, 'g-recaptcha-response': captcha } = req.body;
            try {
                this.validateCaptcha(captcha);
                if (this.isMailInvalid(mail)) {
                    this.handleInvalidMail(res);
                }
                else {
                    this.validateMailFormat(mail);
                    yield this.validateAccount(mail, psw, psw2, pseudo);
                    const hashedPassword = yield Hash_1.Hash.hashPassword(psw);
                    const session = yield this.createSessionInDb(mail, pseudo, hashedPassword);
                    if (session != null) {
                        this.setSessionCookie(res, 'token', session.Token);
                        this.handleSuccess(res, 'Inscription réussie', session);
                        this.sendAccessCode(mail);
                    }
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    this.handleError(res, error.message);
                }
                else {
                    this.handleError(res, 'An unexpected error occurred in the signup section.');
                }
            }
        });
    }
    /**
     * Handles the POST request for user login.
     *
     * @param req - The HTTP request object containing user login data.
     * @param res - The HTTP response object to send a response back to the client.
     */
    postlogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { mail, psw } = req.body;
            try {
                this.validateLoginInput(mail, psw);
                const account = yield this.accountDAO.getAccountByMail(mail);
                if (account != null) {
                    yield this.createAndSetSession(res, mail, account);
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    this.handleError(res, error.message);
                }
                else {
                    this.handleError(res, 'An unexpected error occurred in the login section.');
                }
            }
        });
    }
    validateLoginInput(mail, psw) {
        if (!mail || !psw) {
            throw new Error('Veuillez fournir une adresse e-mail et un mot de passe.');
        }
        const isAccountValid = this.isAccountValid(mail, psw);
        if (!isAccountValid) {
            throw new Error('Adresse e-mail ou mot de passe incorrect.');
        }
    }
    createAndSetSession(res, mail, account) {
        return __awaiter(this, void 0, void 0, function* () {
            const dateNow = Date.now();
            const token = yield Hash_1.Hash.generateToken(mail, dateNow.toString());
            this.sessionDAO.create(new session_1.Session(0, token, dateNow, account));
            const session = yield this.sessionDAO.getByID(yield this.sessionDAO.getLastInsertedID());
            if (session !== null && session !== undefined) {
                this.setSessionCookie(res, 'token', session.Token);
                this.handleSuccess(res, 'Connexion réussie', session);
            }
            else {
                this.handleFailure(res, 'Une erreur est survenue');
            }
        });
    }
    validateCaptcha(captcha) {
        return __awaiter(this, void 0, void 0, function* () {
            const secretKey = '6LcUvrIoAAAAAFAPPi3cdZtxIPQ_lNHrJqcZviSA';
            const response = yield axios_1.default.post('https://www.google.com/recaptcha/api/siteverify', null, {
                params: {
                    secret: secretKey,
                    response: captcha,
                },
            });
            const data = response.data;
            if (!data.success) {
                throw new Error('Merci de valider le captcha');
            }
        });
    }
    handleInvalidMail(res) {
        res.status(400).json({
            success: false,
            message: 'Merci d\'entrer une adresse mail correcte'
        });
    }
    validateMailFormat(mail) {
        const regex = /^[a-zA-Z0-9._-]+@iut-dijon\.u-bourgogne\.fr$/;
        if (!regex.test(mail)) {
            throw new Error('Vous devez avoir un mail IUT de Dijon');
        }
    }
    validateAccount(mail, psw, psw2, pseudo) {
        return __awaiter(this, void 0, void 0, function* () {
            let conditionMail = yield this.accountDAO.checkExistingMails(mail);
            if (!conditionMail) {
                this.validatePassword(psw, psw2);
            }
            else {
                throw new Error("L'email rentré est déjà associé à un autre compte");
            }
        });
    }
    validatePassword(psw, psw2) {
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
    isMailInvalid(mail) {
        return mail === '' || mail === null || mail === undefined;
    }
    isAccountValid(mail, psw) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = false;
            let mailValid = yield this.accountDAO.checkExistingMails(mail);
            if (mailValid) {
                let account = yield this.accountDAO.getAccountByMail(mail);
                if (account) {
                    let passwordValid = yield Hash_1.Hash.comparePassword(psw, account.Hash);
                    if (passwordValid) {
                        result = true;
                    }
                }
            }
            return result;
        });
    }
    handleError(res, message) {
        res.status(500).json({
            success: false,
            message,
        });
    }
    handleSuccess(res, message, session) {
        res.status(200).json({
            success: true,
            message,
            session,
        });
    }
    handleFailure(res, message) {
        res.status(400).json({
            success: false,
            message,
        });
    }
    setSessionCookie(res, name, value) {
        const cookieString = cookie.serialize(name, value, {
            path: '/',
        });
        res.setHeader('Set-Cookie', [cookieString]);
    }
    clearSessionCookie(res) {
        res.clearCookie('token');
    }
    deleteSession(token) {
        this.sessionDAO.deleteSessionByToken(token);
    }
    createUserInDb(firstName, lastName) {
        return __awaiter(this, void 0, void 0, function* () {
            this.userDAO.create(new user_1.User(0, firstName, lastName));
            let user = yield this.userDAO.getByID(yield this.userDAO.getLastInsertedID());
            return user;
        });
    }
    createAccountInDb(email, pseudo, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.createUserInDb("", "");
            this.accountDAO.create(new account_1.Account(0, email, pseudo, hash, user));
            let account = yield this.accountDAO.getByID(yield this.accountDAO.getLastInsertedID());
            return account;
        });
    }
    createSessionInDb(email, pseudo, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            let account = yield this.createAccountInDb(email, pseudo, hash);
            let dateNow = Date.now();
            let token = yield Hash_1.Hash.generateToken(email, dateNow.toString());
            this.sessionDAO.create(new session_1.Session(0, token, dateNow, account));
            let session = yield this.sessionDAO.getByID(yield this.sessionDAO.getLastInsertedID());
            return session;
        });
    }
    generateRandomCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    sendAccessCode(email) {
        this.generatedCode = this.generateRandomCode();
        let mailer = nodemailer_1.default.createTransport({
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
    isAccessCodeValid(enteredCode) {
        return enteredCode === this.generatedCode;
    }
}
exports.Authentification = Authentification;
