import { Either, Failure, Success } from "simply-either-ts";
import {IEntityRepository} from "@modules/Entity/Domain/IEntityRepository";
import {EntityNotFound} from "@modules/Entity/Domain/Errors/EntityNotFound";
import {IEntity} from "@modules/Entity/Domain/IEntity";

/**
 * In memory implementation of the entity repository.
 */
export class InMemoryEntityRepository<TEntity extends IEntity> implements IEntityRepository<TEntity> {
    private readonly entities: Array<TEntity>;

    public constructor() {
        this.entities = new Array<TEntity>();
    }

    public async Add(entity: TEntity): Promise<void> {
        this.entities.push(entity);
    }

    public async Remove(entity: TEntity): Promise<void> {
        const index = this.entities.findIndex(e => e === entity);
        if (index !== -1) {
            this.entities.splice(index, 1);
        }
    }

    public async FindByIdentifier(identifier: string): Promise<Either<TEntity, EntityNotFound>> {
        let result: Either<TEntity, EntityNotFound> = Failure(new EntityNotFound());

        for (const entity of this.entities) {
            if (entity.Identifier == identifier)
                result = Success(entity);
        }

        return result;
    }

    public async FindAll(): Promise<Array<TEntity>> {
        return this.entities;
    }
}