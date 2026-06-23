import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import pluginQuery from '@tanstack/eslint-plugin-query';
import vitestPlugin from '@vitest/eslint-plugin';
import jestDomPlugin from 'eslint-plugin-jest-dom';
import testingLibraryPlugin from 'eslint-plugin-testing-library';

export default [
    ...nextVitals,
    ...nextTypescript,
    ...pluginQuery.configs['flat/recommended'],
    {
        ignores: ['reports/**/*', 'test-results/**/*', '.vscode'],
    },
    {
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    name: 'next/link',
                    message:
                        'Please import from `@/core/i18n/navigation` instead.',
                },
                {
                    name: 'next/navigation',
                    importNames: [
                        'redirect',
                        'permanentRedirect',
                        'useRouter',
                        'usePathname',
                    ],
                    message:
                        'Please import from `@/core/i18n/navigation` instead.',
                },
            ],
            'react/jsx-no-literals': 'warn',
        },
    },
    {
        files: ['src/app/page.tsx'],
        rules: {
            'no-restricted-imports': 'off',
        },
    },
    {
        files: ['src/**/*.+(spec|test).[jt]s?(x)'],
        plugins: {
            vitest: vitestPlugin,
            ...jestDomPlugin.configs['flat/recommended'].plugins,
            ...testingLibraryPlugin.configs['flat/react'].plugins,
        },
        rules: {
            ...vitestPlugin.configs.recommended.rules,
            ...jestDomPlugin.configs['flat/recommended'].rules,
            ...testingLibraryPlugin.configs['flat/react'].rules,
        },
    },
];
