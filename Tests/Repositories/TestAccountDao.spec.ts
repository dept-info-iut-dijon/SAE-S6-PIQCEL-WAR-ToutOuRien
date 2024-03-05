import { IDatabase } from "../../App/Data/IDatabase";
import { CreateDatabase } from "../../App/Data/DatabaseChoice";

import { UserDAO } from "../../App/Models/DAO/userDAO";
import { AccountDAO } from "../../App/Models/DAO/accountDAO";

import { User } from "../../App/Models/User";
import { Account } from "../../App/Models/Account";


describe('Test DAO of Repositories Classes : Account', () => {
    let user: User;
    let database: IDatabase;
    let dao: AccountDAO;
    let userDao: UserDAO;
    let userLastInsertedId: number;
    let accountLastInsertedID : number;

    beforeEach(async () => {
        database = CreateDatabase("sqlite");
        dao = new AccountDAO(database);
        await database.connect();
        userDao = new UserDAO(database);
        userLastInsertedId = await userDao.getLastInsertedID()
        user = new User(userLastInsertedId, 'BADET', 'Mattéo');
        userDao.create(user);

        accountLastInsertedID = await dao.getLastInsertedID()
    });

    afterAll(() => {
        database.close();
    })

    test('Insert Table Account', async () => {
        let acc = new Account(accountLastInsertedID + 1, 'm.badet@ymag.fr', "Matt", "#######", user);
        dao.create(acc);
        let accReq = await dao.getByID(accountLastInsertedID + 1);
        expect(accReq).toEqual(acc);
    });

    test('Edit Table Account', async () => {
        let acc = new Account(accountLastInsertedID, 'm.badet@ymag.fr', "Matt", "#######", user);
        acc.Pseudo = 'Matt21240';
        dao.edit(acc);
        let accReq = await dao.getByID(accountLastInsertedID);
        expect(accReq).toEqual(acc);
    });

    test('Delete Table Account', async () => {
        let acc = new Account(accountLastInsertedID, 'm.badet@ymag.fr', "Matt21240", "#######", user);
        dao.delete(acc);
        let accReq = await dao.getByID(accountLastInsertedID);
        expect(accReq).toBeNull();
    });

});