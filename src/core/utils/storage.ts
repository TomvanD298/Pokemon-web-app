/**
 * Typed wrapper for localStorage with automatic JSON serialization/deserialization
 */
const storage = {
    get<T>(key: string, defaultValue: T): string | T {
        try {
            const value = localStorage.getItem(key);
            if (value === null) {
                return defaultValue;
            }
            return JSON.parse(value) as T;
        } catch (e) {
            console.error('Reading from localStorage failed', e);
            return defaultValue;
        }
    },
    set(key: string, value: unknown) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Saving to localStorage failed', e);
        }
    },
    remove(key: string) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Removing from localStorage failed', e);
        }
    },
    isAvailable(): boolean {
        try {
            const key = 'has-localStorage';
            storage.set(key, null);
            storage.remove(key);
            return true;
        } catch (e) {
            console.error('Local storage is not available', e);
            return false;
        }
    },
};

export default storage;
