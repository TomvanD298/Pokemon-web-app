import { assert, AssertionError } from './assert';

describe('AssertionError', () => {
    it('should create an instance with a custom message', () => {
        const message = 'Custom error message';
        const error = new AssertionError(message);
        expect(error).toBeInstanceOf(AssertionError);
        expect(error.message).toBe(`AssertionError: ${message}`);
    });

    it('should handle an empty string as a message', () => {
        const message = '';
        const error = new AssertionError(message);
        expect(error).toBeInstanceOf(AssertionError);
        expect(error.message).toBe('AssertionError: ');
    });
});
describe('assert', () => {
    it('should not throw an error when value is non-nullish', () => {
        const value = 42;
        expect(() => assert(value)).not.toThrow();
    });

    it('should throw an error when value is nullish', () => {
        const value = null;
        expect(() => assert(value)).toThrow(
            'AssertionError: Value is nullish.',
        );
    });
});
