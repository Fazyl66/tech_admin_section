const { Pool } = require('pg');

const pool = new Pool({
    user: 'deepak',
    host: 'localhost',
    database: 'techdb',
    password: 'deepak123',
    port: 5432,
});

module.exports = pool;