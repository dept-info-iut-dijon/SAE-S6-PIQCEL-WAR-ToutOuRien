/**
 * Allows to generate unique identifiers.
 */
export interface IIdentifierGenerator {
    /**
     * Generates a unique identifier.
     * @returns The unique identifier.
     */
    GenerateIdentifier(): Promise<string>;
}