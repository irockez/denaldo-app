// server/controllers/reportController.js
const pool = require("../db");

exports.saveReport = async (req, res) => {
    console.log("Полученные данные:", req.body);

    const { id, rawData, parsedData, additional } = req.body;

    if (!id || !rawData || !parsedData) {
        return res.status(400).json({ error: 'Отсутствуют обязательные поля' });
    }

    try {
        const query = `
            INSERT INTO reports (id, raw_data, parsed_data, additional)
            VALUES ($1, $2, $3, $4)
        `;
        console.log("Запрос с параметрами:", [
            id, rawData, parsedData, additional
        ]);

        await pool.query(query, [
            id,
            rawData,
            JSON.stringify(parsedData),
            JSON.stringify(additional),
        ]);

        res.status(200).json({ message: 'Данные успешно сохранены!' });
    } catch (err) {
        console.error('Ошибка при сохранении отчёта:', err.message);
        res.status(500).json({ error: 'Ошибка при сохранении данных' });
    }
};