import { afterEach, beforeEach, describe, expect, it, test, vi } from 'vitest';
import storage from './storage';

const TEST_DATA = {
    object: { name: 'John', age: 30 },
    array: [1, 2, 3, 4, 5],
    string: 'test string',
    number: 42,
    boolean: true,
    null: null,
    complexObject: {
        user: {
            name: 'John',
            address: { city: 'NYC', zip: 10001 },
        },
        items: [{ id: 1 }, { id: 2 }],
    },
} as const;

const STORAGE_ERRORS = {
    unavailable: new Error('localStorage not available'),
    quotaExceeded: new Error('QuotaExceededError'),
    securityError: new Error('SecurityError'),
    parseFailed: new Error('Unexpected token'),
} as const;

describe('storage', () => {
    let mockLocalStorage: {
        getItem: ReturnType<typeof vi.fn>;
        setItem: ReturnType<typeof vi.fn>;
        removeItem: ReturnType<typeof vi.fn>;
        clear: ReturnType<typeof vi.fn>;
    };
    let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
        // Create mock localStorage
        mockLocalStorage = {
            getItem: vi.fn(),
            setItem: vi.fn(),
            removeItem: vi.fn(),
            clear: vi.fn(),
        };

        // Stub global localStorage
        vi.stubGlobal('localStorage', mockLocalStorage);

        // Spy on console.error to verify error logging
        consoleErrorSpy = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {});
    });

    afterEach(() => {
        // Restore all mocks
        vi.unstubAllGlobals();
        vi.restoreAllMocks();
    });

    describe('get', () => {
        describe('happy path', () => {
            test.each([
                {
                    type: 'object',
                    value: TEST_DATA.object,
                    key: 'user',
                    defaultValue: {},
                },
                {
                    type: 'array',
                    value: TEST_DATA.array,
                    key: 'numbers',
                    defaultValue: [],
                },
                {
                    type: 'string',
                    value: TEST_DATA.string,
                    key: 'text',
                    defaultValue: '',
                },
                {
                    type: 'number',
                    value: TEST_DATA.number,
                    key: 'count',
                    defaultValue: 0,
                },
                {
                    type: 'boolean',
                    value: TEST_DATA.boolean,
                    key: 'flag',
                    defaultValue: false,
                },
                {
                    type: 'null',
                    value: TEST_DATA.null,
                    key: 'nullValue',
                    defaultValue: 'default',
                },
            ])(
                'should return parsed $type value from localStorage',
                ({ value, key, defaultValue }) => {
                    mockLocalStorage.getItem.mockReturnValue(
                        JSON.stringify(value),
                    );

                    const result = storage.get(key, defaultValue);

                    expect(mockLocalStorage.getItem).toHaveBeenCalledWith(key);
                    expect(result).toEqual(value);
                },
            );

            it('should handle complex nested objects', () => {
                mockLocalStorage.getItem.mockReturnValue(
                    JSON.stringify(TEST_DATA.complexObject),
                );

                const result = storage.get('complex', {});

                expect(result).toEqual(TEST_DATA.complexObject);
            });
        });

        describe('edge cases', () => {
            it('should return default value when key does not exist in localStorage', () => {
                mockLocalStorage.getItem.mockReturnValue(null);
                const defaultValue = { default: true };

                const result = storage.get('nonexistent', defaultValue);

                expect(result).toBe(defaultValue);
            });

            it('should return empty string when stored value is empty string', () => {
                mockLocalStorage.getItem.mockReturnValue('""');

                const result = storage.get('empty', 'default');

                expect(result).toBe('');
            });
        });

        describe('error handling', () => {
            test.each([
                {
                    scenario: 'JSON parsing fails',
                    setup: () => {
                        mockLocalStorage.getItem.mockReturnValue(
                            'invalid json {]',
                        );
                    },
                },
                {
                    scenario: 'localStorage.getItem throws exception',
                    setup: () => {
                        mockLocalStorage.getItem.mockImplementation(() => {
                            throw STORAGE_ERRORS.unavailable;
                        });
                    },
                },
            ])(
                'should return default value and log error when $scenario',
                ({ setup }) => {
                    setup();
                    const defaultValue = 'fallback';

                    const result = storage.get('key', defaultValue);

                    expect(result).toBe(defaultValue);
                    expect(consoleErrorSpy).toHaveBeenCalledWith(
                        'Reading from localStorage failed',
                        expect.any(Error),
                    );
                },
            );
        });

        describe('type safety', () => {
            it('should maintain type inference with generic parameter', () => {
                type User = { id: number; name: string };
                const defaultUser: User = { id: 0, name: '' };
                mockLocalStorage.getItem.mockReturnValue(
                    JSON.stringify({ id: 1, name: 'John' }),
                );

                const result = storage.get<User>('user', defaultUser);

                expect(result).toEqual({ id: 1, name: 'John' });
            });
        });
    });

    describe('set', () => {
        describe('happy path', () => {
            test.each([
                { type: 'object', key: 'user', value: TEST_DATA.object },
                { type: 'array', key: 'numbers', value: TEST_DATA.array },
                { type: 'string', key: 'text', value: TEST_DATA.string },
                { type: 'number', key: 'count', value: TEST_DATA.number },
                { type: 'boolean', key: 'flag', value: TEST_DATA.boolean },
            ])(
                'should store $type value with JSON serialization',
                ({ key, value }) => {
                    storage.set(key, value);

                    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
                        key,
                        JSON.stringify(value),
                    );
                },
            );
        });

        describe('edge cases', () => {
            test.each([
                { type: 'null', key: 'nullKey', value: null },
                { type: 'undefined', key: 'undefinedKey', value: undefined },
                { type: 'empty object', key: 'empty', value: {} },
                { type: 'empty array', key: 'emptyArray', value: [] },
            ])('should handle $type values', ({ key, value }) => {
                storage.set(key, value);

                expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
                    key,
                    JSON.stringify(value),
                );
            });

            it('should handle complex nested objects', () => {
                const complexData = {
                    user: { name: 'John', nested: { deep: true } },
                    items: [{ id: 1 }],
                };

                storage.set('complex', complexData);

                expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
                    'complex',
                    JSON.stringify(complexData),
                );
            });
        });

        describe('error handling', () => {
            test.each([
                {
                    scenario: 'localStorage.setItem throws exception',
                    setup: () => {
                        mockLocalStorage.setItem.mockImplementation(() => {
                            throw STORAGE_ERRORS.quotaExceeded;
                        });
                    },
                    value: 'test value',
                },
                {
                    scenario: 'JSON.stringify fails with circular reference',
                    setup: () => {},
                    value: (() => {
                        const circular: { self?: unknown } = {};
                        circular.self = circular;
                        return circular;
                    })(),
                },
            ])(
                'should not throw and log error when $scenario',
                ({ setup, value }) => {
                    setup();

                    expect(() => storage.set('key', value)).not.toThrow();
                    expect(consoleErrorSpy).toHaveBeenCalledWith(
                        'Saving to localStorage failed',
                        expect.any(Error),
                    );
                },
            );
        });
    });

    describe('remove', () => {
        it('should remove key from localStorage', () => {
            storage.remove('testKey');

            expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('testKey');
            expect(mockLocalStorage.removeItem).toHaveBeenCalledTimes(1);
        });

        test.each([
            { scenario: 'non-existent key', key: 'nonexistent' },
            { scenario: 'empty string key', key: '' },
            {
                scenario: 'special characters',
                key: 'key-with-special!@#$%^&*()chars',
            },
        ])('should handle $scenario gracefully', ({ key }) => {
            storage.remove(key);

            expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(key);
            expect(consoleErrorSpy).not.toHaveBeenCalled();
        });

        it('should not throw and log error when localStorage.removeItem throws', () => {
            mockLocalStorage.removeItem.mockImplementation(() => {
                throw STORAGE_ERRORS.unavailable;
            });

            expect(() => storage.remove('key')).not.toThrow();
            expect(consoleErrorSpy).toHaveBeenCalledWith(
                'Removing from localStorage failed',
                expect.any(Error),
            );
        });
    });

    describe('isAvailable', () => {
        it('should return true and perform test write/remove when localStorage is available', () => {
            const result = storage.isAvailable();

            expect(result).toBe(true);
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
                'has-localStorage',
                JSON.stringify(null),
            );
            expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(
                'has-localStorage',
            );
        });

        test.each([
            {
                scenario: 'localStorage.setItem throws',
                setup: () => {
                    mockLocalStorage.setItem.mockImplementation(() => {
                        throw STORAGE_ERRORS.quotaExceeded;
                    });
                },
                expectedErrorMessage: 'Saving to localStorage failed',
            },
            {
                scenario: 'localStorage.removeItem throws',
                setup: () => {
                    mockLocalStorage.removeItem.mockImplementation(() => {
                        throw STORAGE_ERRORS.unavailable;
                    });
                },
                expectedErrorMessage: 'Removing from localStorage failed',
            },
        ])(
            'should return true and log error when $scenario',
            ({ setup, expectedErrorMessage }) => {
                setup();

                const result = storage.isAvailable();

                expect(result).toBe(true);
                expect(() => storage.isAvailable()).not.toThrow();
                expect(consoleErrorSpy).toHaveBeenCalledWith(
                    expectedErrorMessage,
                    expect.any(Error),
                );
            },
        );
    });

    describe('integration scenarios', () => {
        const createMockStorage = () => {
            const storageData: Record<string, string> = {};

            mockLocalStorage.setItem.mockImplementation((key, value) => {
                storageData[key] = value;
            });

            mockLocalStorage.getItem.mockImplementation(
                key => storageData[key] || null,
            );

            mockLocalStorage.removeItem.mockImplementation(key => {
                delete storageData[key];
            });

            return storageData;
        };

        it('should successfully set and get a value', () => {
            const testData = { id: 1, name: 'Test' };
            createMockStorage();

            storage.set('data', testData);
            const result = storage.get('data', {});

            expect(result).toEqual(testData);
        });

        it('should handle complete set, get, and remove workflow', () => {
            createMockStorage();

            storage.set('test', 'value');
            expect(storage.get('test', '')).toBe('value');

            storage.remove('test');
            expect(storage.get('test', 'default')).toBe('default');
        });

        it('should work with availability check followed by operations', () => {
            const isAvailable = storage.isAvailable();

            expect(isAvailable).toBe(true);

            storage.set('key', 'value');
            expect(mockLocalStorage.setItem).toHaveBeenCalled();
        });
    });
});
