import { Either } from "simply-either-ts";
import {EntityNotFound} from "./Errors/EntityNotFound";
import {IEntity} from "@modules/Entity/Domain/IEntity";

/**
 * Represents a generic repository for entities.
 */
export interface IEntityRepository<TEntity extends IEntity> {
    /**
     * Add the entity to the repository.
     * @param entity - the entity to add.
     */
    Add(entity: TEntity): Promise<void>;

    /**
     * Remove the entity from the repository.
     * @param entity - the entity to remove.
     */
    Remove(entity: TEntity): Promise<void>;

    /**
     * Find the entity according to the identifier.
     * @param identifier - the identifier of the entity.
     * @returns the entity.
     */
    FindByIdentifier(identifier: string): Promise<Either<TEntity, EntityNotFound>>;

    /**
     * Find the first entity that satisfy the predicate.
     * @param predicate - the predicate to satisfy.
     */
    FindOneWhere(predicate: (entity: TEntity) => boolean): Promise<Either<TEntity, EntityNotFound>>;

    /**
     * Find all the entities from the repository.
     * @returns an array of entity.
     */
    FindAll(): Promise<Array<TEntity>>;
}