/** @type {import("prettier").Config} */
export default {
    trailingComma: 'all',
    semi: true,
    singleQuote: true,
    endOfLine: 'auto',
    arrowParens: 'avoid',
    tailwindConfig: './tailwind.config.js',
    tailwindAttributes: ['className', 'class'],
    tailwindFunctions: ['cn', 'cva'],
    plugins: ['prettier-plugin-tailwindcss'],
};
