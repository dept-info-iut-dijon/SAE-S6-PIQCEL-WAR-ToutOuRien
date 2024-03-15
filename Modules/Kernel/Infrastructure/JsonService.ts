import "reflect-metadata";
import "es6-shim";
import {instanceToPlain, plainToInstance} from "class-transformer";

/**
 * A utility class for serializing and deserializing objects to JSON.
 */
export class JsonService {
    /**
     * Serializes the given value to a JSON string.
     * @param value The value to be serialized.
     * @returns The JSON string representation of the value.
     */
    public static Serialise<Type>(value: Type): string {
        return JSON.stringify(instanceToPlain(value));
    }

    /**
     * Deserializes the given JSON string to an object of the specified class.
     * @param value The JSON string to be deserialized.
     * @param classType The class to deserialize the JSON string into.
     * @returns An instance of the specified class.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static Deserialise<Type>(value: string, classType: new (...args: Array<any>) => Type): Type {
        let result = JSON.parse(value);
        return plainToInstance(classType, result, { });
    }
}