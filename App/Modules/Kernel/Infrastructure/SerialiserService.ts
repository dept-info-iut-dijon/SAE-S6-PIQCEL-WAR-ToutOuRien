import {instanceToPlain, plainToInstance} from "class-transformer";

export class SerialiserService {

    public static Serialise<Type>(value: Type): string {
        return JSON.stringify(instanceToPlain(value));
    }

    public static Deserialise<Type>(value: string, classType: new (...args: Array<any>) => Type): Type {
        let result = structuredClone(value);
        console.log(result)
        return plainToInstance(classType, result);
    }
}