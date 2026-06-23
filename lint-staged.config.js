/** @type {import('lint-staged').Configuration} */
export default {
    '*.(js|cjs|mjs|jsx|ts|tsx)': 'eslint --fix --max-warnings 0',
    '*.(ts)': () => 'tsc -p tsconfig.json --noEmit',
    '*.css': 'stylelint --fix',
    '*': 'prettier --write --ignore-unknown',
};
