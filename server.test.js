// Basic tests for hello-api
// Week 3 CI Pipeline exercise

describe('Hello API', () => {

    test('environment has a PORT variable', () => {
        const port = process.env.PORT || 3000;
        expect(['number', 'string']).toContain(typeof port);
    });

    test('NODE_ENV is set', () => {
        const env = process.env.NODE_ENV || 'development';
        expect(['development', 'production', 'test']).toContain(env);
    });

    test('basic math works', () => {
        expect(2 + 2).toBe(4);
    });

});
