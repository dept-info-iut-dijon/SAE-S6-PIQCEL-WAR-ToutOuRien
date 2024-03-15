import { v4 as uuidv4 } from 'uuid';
import {IIdentifierGenerator} from "@modules/Kernel/Application/IIdentifierGenerator";

/**
 * Represents a Uuid provider for encapsulation.
 */
export class UuidProvider implements IIdentifierGenerator {
    public async GenerateIdentifier(): Promise<string> {
        return await this.GenerateUuid();
    }

    private async GenerateUuid(): Promise<string> {
        return uuidv4();
    }
}