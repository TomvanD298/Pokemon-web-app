import publicAssetPath from './publicAssetPath';

describe('publicAssetPath', () => {
    const originalBasePath = process.env.NEXT_PUBLIC_BASE_PATH;

    afterEach(() => {
        if (originalBasePath === undefined) {
            delete process.env.NEXT_PUBLIC_BASE_PATH;
        } else {
            process.env.NEXT_PUBLIC_BASE_PATH = originalBasePath;
        }

        vi.resetModules();
    });

    it('returns the path unchanged when no base path is configured', async () => {
        delete process.env.NEXT_PUBLIC_BASE_PATH;
        const { default: resolvePublicAssetPath } = await import(
            './publicAssetPath'
        );

        expect(resolvePublicAssetPath('/images/mock/card.png')).toBe(
            '/images/mock/card.png',
        );
    });

    it('prefixes absolute public asset paths with the base path', async () => {
        process.env.NEXT_PUBLIC_BASE_PATH = '/pokemon-web-app';
        const { default: resolvePublicAssetPath } = await import(
            './publicAssetPath'
        );

        expect(resolvePublicAssetPath('/images/mock/card.png')).toBe(
            '/pokemon-web-app/images/mock/card.png',
        );
    });

    it('returns relative paths unchanged', async () => {
        process.env.NEXT_PUBLIC_BASE_PATH = '/pokemon-web-app';
        const { default: resolvePublicAssetPath } = await import(
            './publicAssetPath'
        );

        expect(resolvePublicAssetPath('images/mock/card.png')).toBe(
            'images/mock/card.png',
        );
    });
});
