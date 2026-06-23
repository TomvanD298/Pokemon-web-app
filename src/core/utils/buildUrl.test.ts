import buildUrl from './buildUrl';

describe('buildUrl', () => {
    it('should replace path parameters with values from params', () => {
        const path = '/users/:id';
        const params = { id: '123', tab: 'settings' };
        const result = buildUrl(path, params);
        expect(result).toBe('/users/123?tab=settings');
    });

    it('should return the same path when no matching params', () => {
        const path = '/users/profile';
        const params = { id: '123', tab: 'settings' };
        const result = buildUrl(path, params);
        expect(result).toBe('/users/profile?id=123&tab=settings');
    });

    it('should append remaining params as query parameters when path contains path parameters', () => {
        const path = '/users/:id';
        const params = { id: '123', tab: 'settings' };
        const result = buildUrl(path, params);
        expect(result).toBe('/users/123?tab=settings');
    });

    it('should handle multiple path parameters correctly', () => {
        const path = '/users/:id/:name';
        const params = { id: '123', name: 'john', tab: 'settings' };
        const result = buildUrl(path, params);
        expect(result).toBe('/users/123/john?tab=settings');
    });

    it('should handle paths without any parameters', () => {
        const path = '/users';
        const params = { tab: 'settings' };
        const result = buildUrl(path, params);
        expect(result).toBe('/users?tab=settings');
    });
});
