import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/core/i18n/request.ts');

const isStaticExport = process.env.NEXT_OUTPUT === 'export';

const basePath = process.env.BASE_PATH ?? '';

const cspHeader = `
    frame-ancestors 'none';
`;

/** @type {import('next').NextConfig} */
const nextConfig = {
    devIndicators: false,
    output: isStaticExport ? 'export' : 'standalone',
    ...(isStaticExport && {
        basePath,
        assetPrefix: basePath ? `${basePath}/` : undefined,
        trailingSlash: true,
        images: {
            unoptimized: true,
        },
    }),
    ...(!isStaticExport && {
        async headers() {
            return [
                {
                    source: '/(.*)?',
                    headers: [
                        {
                            key: 'Content-Security-Policy',
                            value: cspHeader.replace(/\n/g, ''),
                        },
                    ],
                },
            ];
        },
    }),

    webpack: config => {
        const fileLoaderRule = config.module.rules.find(rule =>
            rule.test?.test?.('.svg'),
        );

        config.module.rules.push(
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/,
            },
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: {
                    not: [...fileLoaderRule.resourceQuery.not, /url/],
                },
                use: ['@svgr/webpack'],
            },
        );

        fileLoaderRule.exclude = /\.svg$/i;

        return config;
    },
};

export default withNextIntl(nextConfig);
