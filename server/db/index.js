const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'trade_stats',
    password: 'postgres',
    port: 5432,
});

// Просто вставка данных из parsedData в parsed_data
async function insertParsedData(id, parsedData) {
    const query = `INSERT INTO parsed_data (parsed_data) VALUES ($1)`;
    await pool.query(query, [parsedData]);
}

module.exports = pool;