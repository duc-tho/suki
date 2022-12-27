module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: [
        'plugin:react/recommended',
        'standard-with-typescript'
    ],
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: [
        'react',
        'import'
    ],
    rules: {
        indent: ['error', 4],
        semi: ['error', 'always'],
        'import/no-unresolved': 'error'
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx']
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
                directory: [
                    './tsconfig.json',
                    './src/server/tsconfig.server.json'
                ]
            }
        }
    }
};
