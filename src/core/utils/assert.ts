export class AssertionError extends Error {
    static isAssertionError(value: unknown): value is AssertionError {
        return value instanceof AssertionError;
    }

    constructor(message: string) {
        super(`AssertionError: ${message}`);
    }
}

export function assert<T>(
    value: T,
    message = 'Value is nullish.',
): asserts value is T {
    if (value == null) {
        throw new AssertionError(message);
    }
}
