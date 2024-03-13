import { v4 as uuidv4 } from 'uuid';

/**
 * Represents a Uuid provider for encapsulation.
 */
export class UuidProvider {
    public async GenerateUuid(): Promise<string> {
        return uuidv4();
    }
}