import { IDatabase } from "../../App/Data/IDatabase";
import { CreateDatabase } from "../../App/Data/DatabaseChoice";

import { UserDAO } from "../../App/Models/DAO/userDAO";
import { User } from "../../App/Models/User";

describe('Test DAO of Repositories Classes : User', () => {
    let database: IDatabase;
    let userDAO: UserDAO;
    let userLastInsertedID : number;

    beforeAll(async () => {
        database = CreateDatabase("sqlite");
        userDAO = new UserDAO(database);
        await database.connect();
        userLastInsertedID = await userDAO.getLastInsertedID();
    });

    afterAll(() => {
        database.close();
    })

    test('Insert Table User', async () => {
        let newId: number = await userDAO.getLastInsertedID() + 1;
        let user = new User(newId, 'BADET', 'Mattéo');
        await userDAO.create(user);
        let lastUser: User | null = await userDAO.getByID(newId);
        expect(lastUser).not.toEqual(null);
        expect(lastUser).toEqual(user);
    });

    test('Edit Table User', async () => {
        let user = new User(userLastInsertedID, 'BADET', 'Mattéo');
        user.LastName = 'BADETTO';
        await userDAO.edit(user);
        let userReq = await userDAO.getByID(userLastInsertedID);
        expect(userReq).toEqual(user);
    });

    test('Delete Table User', async () => {
        let user = new User(userLastInsertedID, 'BADETTO', 'Mattéo');
        await userDAO.delete(user);
        let userReq = await userDAO.getByID(userLastInsertedID);
        expect(userReq).toBeNull();
    });

});