const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",        // имя пользователя
    host: "localhost",       // или 'database', если это имя контейнера в docker-compose
    database: "trade_stats", // имя твоей базы
    password: "yourpassword",// если задавал
    port: 5432,              // стандартный порт
});

module.exports = pool;