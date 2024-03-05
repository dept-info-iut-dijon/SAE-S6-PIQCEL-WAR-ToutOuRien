import { IDatabase } from "../../App/Data/IDatabase";
import { CreateDatabase } from "../../App/Data/DatabaseChoice";

import { UserDAO } from "../../App/Models/DAO/userDAO";
import { AccountDAO } from "../../App/Models/DAO/accountDAO";
import { SessionDAO } from "../../App/Models/DAO/sessionDAO";

import { User } from "../../App/Models/User";
import { Account } from "../../App/Models/Account";
import { Session } from "../../App/Models/Session";

describe('Test DAO of Repositories Classes : Session', () => {
    let database: IDatabase;
    let userDAO: UserDAO;
    let accountDAO: AccountDAO;
    let sessionDAO: SessionDAO;

    let userLastInsertedID : number;
    let accountLastInsertedID : number;
    let sessionLastInsertedID : number;

    let user: User;
    let acc: Account;

    beforeEach(async () => {
        database = CreateDatabase("sqlite");
        userDAO = new UserDAO(database);
        accountDAO = new AccountDAO(database);
        sessionDAO = new SessionDAO(database);
        await database.connect();

        userLastInsertedID = await userDAO.getLastInsertedID();
        accountLastInsertedID = await accountDAO.getLastInsertedID();

        user = new User(userLastInsertedID+1, 'BADET', 'Mattéo');
        userDAO.create(user);
        acc = new Account(accountLastInsertedID+1, 'm.badet@ymag.fr', "Matt", "#######", user);
        accountDAO.create(acc);
        sessionLastInsertedID = await sessionDAO.getLastInsertedID();
    });

    afterAll(() => {
        database.close();
    })

    test('Insert Table Account', async () => {
        let sess = new Session(sessionLastInsertedID+1, "K7pRw9q2Xs", 10022020, acc);
        sessionDAO.create(sess);
        let sessReq = await sessionDAO.getByID(sessionLastInsertedID);
        expect(sessReq).toEqual(sess);
    });

    test('Edit Table Account', async () => {
        let sess = new Session(sessionLastInsertedID, "K7pRw9q2Xs", 10022020, acc);
        sess.Token = 'XX_K7pRw9q2Xs_XX';
        sessionDAO.edit(sess);
        let sessReq = await sessionDAO.getByID(sessionLastInsertedID);
        expect(sessReq).toEqual(sess);
    });

    test('Delete Table Account', async () => {
        let sess = new Session(sessionLastInsertedID, "XX_K7pRw9q2Xs_XX", 10022020, acc);
        sessionDAO.delete(sess);
        accountDAO.delete(acc);
        userDAO.delete(user);
        let sessReq = await sessionDAO.getByID(sessionLastInsertedID);
        expect(sessReq).toBeNull();
    });
});