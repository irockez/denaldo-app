const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'trade_stats',
    password: 'postgres',
    port: 5432,
});

// Функция для вставки данных в parsed_data
async function insertParsedData(data) {
    const formatTime = (time) => {
        if (typeof time === 'string') {
            const [hours, minutes, seconds] = time.split(':').map(Number);
            return hours * 3600 + minutes * 60 + seconds;
        }
        return time;
    };

    const query = `
        INSERT INTO parsed_data (
            exchange, start_date, end_date, total_deals, closed_by_tp, closed_by_sl,
            closed_by_signal, liquidation_count, closed_by_so, min_time_in_trade, max_time_in_trade,
            avg_time_in_trade, funds_in_trade, final_deposit, total_profit, profit_percent,
            monthly_profit_percent, withdrawn_profit, commission, calculation_time,
            max_drawdown_from_avg_price, max_drawdown, max_drawdown_from_entry_price,
            max_drawdown_from_avg_price_without_sl, max_drawdown_from_entry_price_without_sl,
            withdrawal_dates, no_data_dates, result
        ) VALUES (
            $1, $2, $3, $4, $5, $6,
            $7, $8, $9, $10, $11,
            $12, $13, $14, $15, $16,
            $17, $18, $19, $20,
            $21, $22, $23,
            $24, $25,
            $26, $27, $28
        )
    `;

    const values = [
        data.exchange,
        data.start_date,
        data.end_date,
        data.total_deals,
        data.closed_by_tp,
        data.closed_by_sl,
        data.closed_by_signal,
        data.liquidation_count,
        data.closed_by_so,
        formatTime(data.min_time_in_trade),
        formatTime(data.max_time_in_trade),
        formatTime(data.avg_time_in_trade),
        data.funds_in_trade,
        data.final_deposit,
        data.total_profit,
        data.profit_percent,
        data.monthly_profit_percent,
        data.withdrawn_profit,
        data.commission,
        data.calculation_time,
        data.max_drawdown_from_avg_price,
        data.max_drawdown,
        data.max_drawdown_from_entry_price,
        data.max_drawdown_from_avg_price_without_sl,
        data.max_drawdown_from_entry_price_without_sl,
        data.withdrawal_dates,
        data.no_data_dates,
        data.result
    ];

    await pool.query(query, values);
}

// Функция для получения всех данных из parsed_data
async function getAllParsedData() {
    const result = await pool.query('SELECT * FROM parsed_data');
    return result.rows;
}

// Функция для вставки данных формы в form_data
async function insertFormData(form_type, content, created_at) {
    const query = `INSERT INTO form_data (form_type, content, created_at) VALUES ($1, $2, $3) RETURNING id`;
    const values = [form_type, content, created_at];
    const result = await pool.query(query, values);
    return result;
}

// Функция для получения всех данных из form_data
async function getAllFormData() {
    const result = await pool.query('SELECT * FROM form_data');
    return result.rows;
}

module.exports = {
    insertParsedData,
    getAllParsedData,
    insertFormData,
    getAllFormData
};