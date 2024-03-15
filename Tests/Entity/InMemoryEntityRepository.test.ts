import { Either } from "simply-either-ts";
import {Entity} from "@modules/Entity/Domain/Entity";
import {InMemoryEntityRepository} from "@modules/Entity/Infrastructure/InMemoryEntityRepository";
import {EntityNotFound} from "@modules/Entity/Domain/Errors/EntityNotFound";

describe("InMemoryEntityRepository", () => {
    let repository: InMemoryEntityRepository<Entity>;

    beforeEach(() => {
        repository = new InMemoryEntityRepository<Entity>();
    });

    it("should add an entity", () => {
        const entity = new Entity("123");
        repository.Add(entity);
        expect(repository.FindAll()).toContain(entity);
    });

    it("should remove an entity", () => {
        const entity = new Entity("123");
        repository.Add(entity);
        repository.Remove(entity);
        expect(repository.FindAll()).not.toContain(entity);
    });

    it("should successfully find an entity by identifier", async () => {
        const entity = new Entity("123");
        await repository.Add(entity);
        const result: Either<Entity, EntityNotFound> = await repository.FindByIdentifier("123");
        expect(result.IsSuccess).toBe(true);
        expect(result.Value).toEqual(entity);
    });

    it("should fail to find a non-existent entity and return EntityNotFound", async () => {
        const result: Either<Entity, EntityNotFound> = await repository.FindByIdentifier("anything");
        expect(result.IsFailure).toBe(true);
        expect(result.Value).toBeInstanceOf(EntityNotFound);
    });

    it("should list all entities", () => {
        const entity1 = new Entity("123");
        const entity2 = new Entity("456");
        repository.Add(entity1);
        repository.Add(entity2);
        expect(repository.FindAll()).toEqual(expect.arrayContaining([entity1, entity2]));
    });
});