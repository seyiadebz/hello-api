// eslint.config.js — ESLint v9 flat config

const js = require('@eslint/js');

module.exports = [
    js.configs.recommended,
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 2021,
            globals: {
                require:    'readonly',
                module:     'readonly',
                exports:    'readonly',
                process:    'readonly',
                __dirname:  'readonly',
                __filename: 'readonly',
                console:    'readonly',
                describe:   'readonly',
                test:       'readonly',
                expect:     'readonly',
                it:         'readonly',
                beforeEach: 'readonly',
                afterEach:  'readonly',
                beforeAll:  'readonly',
                afterAll:   'readonly'
            }
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-console':     'off'
        }
    }
];
