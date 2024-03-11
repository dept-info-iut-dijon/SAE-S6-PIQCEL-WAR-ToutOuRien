import {IDatabase} from "../App/Data/IDatabase";
import {CreateDatabase} from "../App/Data/DatabaseChoice";

let database: IDatabase;

beforeAll(async () => {
    database = CreateDatabase("sqlite");
    await database.connect();
});

afterAll(() => {
    database.close();
})

describe('Test Database Connection', () => {

    test('database Tables',async () => {
        const result = await database.queryAll("SELECT name FROM sqlite_master WHERE type='table';", []);
        const output = result.map(item => item.name);
        expect(output).toEqual(["user", "account", "session"]);
    })
});
