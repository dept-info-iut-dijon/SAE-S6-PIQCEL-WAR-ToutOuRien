import {Entity} from "@modules/Entity/Domain/Entity";

describe("Entity", () => {
    it("should store and return its identifier", () => {
        const identifier = "unique_identifier";
        const entity = new Entity(identifier);
        expect(entity.Identifier).toBe(identifier);
    });
});