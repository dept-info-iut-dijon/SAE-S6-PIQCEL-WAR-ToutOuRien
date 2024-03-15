import {IEntity} from "@modules/Entity/Domain/IEntity";
import {ExposeProperties} from "@modules/Kernel/Decorators/ExposeProperties";

/**
 * Represents an entity.
 */
@ExposeProperties()
export class Entity implements IEntity {
    private identifier: string;

    public constructor(identifier: string) {
        this.identifier = identifier;
    }

    public get Identifier(): string { return this.identifier; }
    public set Identifier(value: string) { this.identifier = value;}
}