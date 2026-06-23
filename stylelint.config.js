/** @type {import('stylelint').Config} */
export default {
    extends: ['stylelint-config-standard'],
    ignoreFiles: ['coverage/**/*'],
    rules: {
        'import-notation': 'string',
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: [
                    /** tailwindcss v4 */
                    'theme',
                    'source',
                    'utility',
                    'variant',
                    'custom-variant',
                    'plugin',
                ],
            },
        ],
        'function-no-unknown': [
            true,
            {
                ignoreFunctions: ['theme'],
            },
        ],
    },
};
