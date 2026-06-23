const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/**
 * Prefixes public folder asset paths with the Next.js basePath (e.g. GitHub Pages project site).
 */
const publicAssetPath = (path: string): string => {
    if (!path.startsWith('/') || !basePath) {
        return path;
    }

    return `${basePath}${path}`;
};

export default publicAssetPath;
