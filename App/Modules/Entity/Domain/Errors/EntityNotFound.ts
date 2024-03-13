/**
 * Error thrown when an entity is not found.
 */
export class EntityNotFound extends Error {
    public constructor(typeNameOfEntity?: string) {
        if (!typeNameOfEntity)
            typeNameOfEntity = "Entity";

        super(`${typeNameOfEntity} not found error.`);
    }
}