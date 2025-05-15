// controllers/formController.js
const pool = require('../db/index');
console.log(pool);

// Контроллер для обработки отправки формы
const submitForm = async (req, res) => {
    try {
        const { id, parsedData } = req.body;

        console.log('Получены данные для формы:', req.body);

        if (!id || !parsedData) {
            return res.status(400).json({ error: 'Ожидались поля id и parsedData' });
        }

        const query = `
            INSERT INTO form_results (id, content)
            VALUES ($1, $2)
            ON CONFLICT (id) DO UPDATE SET content = EXCLUDED.content
        `;

        await pool.query(query, [id, parsedData]);

        res.status(200).json({ message: 'Данные успешно сохранены' });
    } catch (error) {
        console.error('Ошибка при сохранении данных формы:', error);
        res.status(500).json({ error: 'Ошибка сервера при сохранении данных' });
    }
};

async function getParsedData(req, res) {
    try {
        const result = await pool.query('SELECT * FROM form_results ORDER BY id DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('Ошибка при получении данных из базы:', err);
        res.status(500).json({ error: 'Ошибка при получении данных' });
    }
}

module.exports = { submitForm, getParsedData };
