import { Database } from "../App/Data/DatabaseChoice";

let database: Database;

beforeAll(async () => {
    database = new Database();
    database.connect();
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
