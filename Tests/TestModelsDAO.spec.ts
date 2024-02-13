import { Database } from "../App/Data/DatabaseChoice";

import { UserDAO } from "../App/Models/DAO/userDAO";
import { AccountDAO } from "../App/Models/DAO/accountDAO";
import { SessionDAO } from "../App/Models/DAO/sessionDAO";

import { User } from "../App/Models/User";
import { Account } from "../App/Models/Account";
import { Session } from "../App/Models/Session";

let database: Database;
let userDAO: UserDAO;
let accountDAO: AccountDAO;
let sessionDAO: SessionDAO;

let userLastInsertedID : number;
let accountLastInsertedID : number;
let sessionLastInsertedID : number;

beforeAll(async () => {
    database = new Database();
    userDAO = new UserDAO(database);
    accountDAO = new AccountDAO(database);
    sessionDAO = new SessionDAO(database);

    database.connect();
});

afterAll(() => {
    database.close();
})

describe('Test DAO of Models Classes : User', () => {

    test('Insert Table User', async () => {
        let user = new User(1, 'BADET', 'Mattéo');
        userDAO.create(user);
        userLastInsertedID = await userDAO.getLastInsertedID();
        let userReq = await userDAO.getByID(userLastInsertedID);
        expect(userReq).toEqual(user);
    });   

    test('Edit Table User', async () => {
        let user = new User(userLastInsertedID, 'BADET', 'Mattéo');
        user.LastName = 'BADETTO';
        userDAO.edit(user);  
        let userReq = await userDAO.getByID(userLastInsertedID);
        expect(userReq).toEqual(user);  
    });

    test('Delete Table User', async () => {
        let user = new User(userLastInsertedID, 'BADETTO', 'Mattéo');
        userDAO.delete(user);
        let userReq = await userDAO.getByID(userLastInsertedID);
        expect(userReq).toBeNull();
    }); 

});

describe('Test DAO of Models Classes : Account', () => {

    test('Insert Table Account', async () => {
        let user = new User(1, 'BADET', 'Mattéo');
        let acc = new Account(1, 'm.badet@ymag.fr', "Matt", "#######", 321, user);
        userDAO.create(user);
        accountDAO.create(acc);
        userLastInsertedID = await userDAO.getLastInsertedID();
        accountLastInsertedID = await accountDAO.getLastInsertedID();
        let accReq = await accountDAO.getByID(accountLastInsertedID);
        expect(accReq).toEqual(acc);
    });   

    test('Edit Table Account', async () => {
        let user = new User(userLastInsertedID, 'BADET', 'Mattéo');
        let acc = new Account(accountLastInsertedID, 'm.badet@ymag.fr', "Matt", "#######", 321, user);
        acc.Pseudo = 'Matt21240';
        accountDAO.edit(acc);
        let accReq = await accountDAO.getByID(accountLastInsertedID);
        expect(accReq).toEqual(acc);
    });

    test('Delete Table Account', async () => {
        let user = new User(userLastInsertedID, 'BADETTO', 'Mattéo');
        let acc = new Account(accountLastInsertedID, 'm.badet@ymag.fr', "Matt21240", "#######", 321, user);
        accountDAO.delete(acc);
        userDAO.delete(user);
        let accReq = await accountDAO.getByID(accountLastInsertedID);
        expect(accReq).toBeNull();
    }); 

});

describe('Test DAO of Models Classes : Session', () => {

    test('Insert Table Account', async () => {
        let user = new User(1, 'BADET', 'Mattéo');
        let acc = new Account(1, 'm.badet@ymag.fr', "Matt", "#######", 321, user);
        let sess = new Session(1, "K7pRw9q2Xs", 10022020, acc);
        userDAO.create(user);
        accountDAO.create(acc);
        sessionDAO.create(sess);
        userLastInsertedID = await userDAO.getLastInsertedID();
        accountLastInsertedID = await accountDAO.getLastInsertedID();
        sessionLastInsertedID = await sessionDAO.getLastInsertedID();
        let sessReq = await sessionDAO.getByID(sessionLastInsertedID);
        expect(sessReq).toEqual(sess);
    });   

    test('Edit Table Account', async () => {
        let user = new User(userLastInsertedID, 'BADET', 'Mattéo');
        let acc = new Account(accountLastInsertedID, 'm.badet@ymag.fr', "Matt", "#######", 321, user);
        let sess = new Session(sessionLastInsertedID, "K7pRw9q2Xs", 10022020, acc);
        sess.Token = 'XX_K7pRw9q2Xs_XX';
        sessionDAO.edit(sess);
        let sessReq = await sessionDAO.getByID(sessionLastInsertedID);
        expect(sessReq).toEqual(sess);
    });

    test('Delete Table Account', async () => {
        let user = new User(userLastInsertedID, 'BADET', 'Mattéo');
        let acc = new Account(accountLastInsertedID, 'm.badet@ymag.fr', "Matt", "#######", 321, user);
        let sess = new Session(sessionLastInsertedID, "XX_K7pRw9q2Xs_XX", 10022020, acc);
        sessionDAO.delete(sess);
        accountDAO.delete(acc);
        userDAO.delete(user);
        let sessReq = await sessionDAO.getByID(sessionLastInsertedID);
        expect(sessReq).toBeNull();
    }); 

});