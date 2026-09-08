// eslint.config.js
// ESLint v9 flat config format

const js = require('@eslint/js');

module.exports = [
    // Apply recommended rules
    js.configs.recommended,

    {
        // Files to lint
        files: ['**/*.js'],

        // Tell ESLint what globals exist in each environment
        languageOptions: {
            ecmaVersion: 2021,
            globals: {
                // Node.js globals
                require:    'readonly',
                module:     'readonly',
                exports:    'readonly',
                process:    'readonly',
                __dirname:  'readonly',
                __filename: 'readonly',
                console:    'readonly',

                // Jest globals
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

        // Your custom rules
        rules: {
            'no-unused-vars': 'warn',
            'no-console':     'off'
        }
    }
];
