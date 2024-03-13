import {IEntity} from "@modules/Entity/Domain/IEntity";

/**
 * Represents an entity.
 */
export class Entity implements IEntity {
    private readonly identifier: string;

    public constructor(identifier: string) {
        this.identifier = identifier;
    }

    public get Identifier(): string { return this.identifier; }
}