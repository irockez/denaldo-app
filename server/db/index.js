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
    const keys = Object.keys(parsedData);
    const values = Object.values(parsedData);

    const columns = keys.join(', ');
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');

    const query = `INSERT INTO parsed_data (${columns}) VALUES (${placeholders})`;

    await pool.query(query, values);
}

module.exports = pool;