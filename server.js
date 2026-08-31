const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Create database connection pool
const db = new Pool({
    host:     process.env.DB_HOST,
    port:     process.env.DB_PORT || 5432,
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Test DB connection on startup
db.connect((err, client, release) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Database connected successfully');
        release();
    }
});

app.get('/', (req, res) => {
    res.json({
        message:  'Hello from inside a container',
        hostname: require('os').hostname(),
        time:     new Date().toISOString()
    });
});

app.get('/health', async (req, res) => {
    try {
        await db.query('SELECT 1');
        res.status(200).json({
            status:   'ok',
            database: 'connected'
        });
    } catch (err) {
        res.status(500).json({
            status:   'unhealthy',
            database: 'disconnected',
            error:    err.message
        });
    }
});

app.get('/db-test', async (req, res) => {
    try {
        const result = await db.query('SELECT NOW() as current_time');
        res.json({
            message: 'Database query successful',
            time:    result.rows[0].current_time
        });
    } catch (err) {
        res.status(500).json({
            message: 'Database query failed',
            error:   err.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

