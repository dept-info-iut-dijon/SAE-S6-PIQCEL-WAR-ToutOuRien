import {Expose} from "class-transformer";

/**
 * A decorator that applies the @Expose decorator from the class-transformer library
 * to all properties of a class that have a getter or a setter.
 *
 * @returns {ClassDecorator} - A class decorator that applies the @Expose decorator to all properties of a class.
 */
export function ExposeProperties(): ClassDecorator {
    return function (constructor: Function) {
        // Get all properties of the class
        const properties = Object.getOwnPropertyNames(constructor.prototype);
        // Filter out the 'constructor' property
        const filteredProperties = properties.filter(prop => prop !== 'constructor');

        filteredProperties.forEach(property => {
            // Get the property descriptor for the current property
            const descriptor = Object.getOwnPropertyDescriptor(constructor.prototype, property);
            // If the property has a getter or a setter, apply the @Expose decorator to it
            if (descriptor?.get || descriptor?.set) {
                Expose()(constructor.prototype, property);
            }
        });
    };
}