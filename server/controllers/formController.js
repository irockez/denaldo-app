const { insertFormData, getAllFormData } = require("../db");

exports.submitForm = async (req, res) => {
    console.log("Получены данные для формы:", req.body);

    const { form_type, content } = req.body;
    const created_at = new Date().toISOString();

    try {
        const result = await insertFormData(form_type, content, created_at);
        res.status(201).json({ id: result.rows[0].id });
    } catch (err) {
        console.error("Ошибка при вставке данных формы:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.getAllData = async (req, res) => {
    try {
        const rows = await getAllFormData();
        res.json(rows);
    } catch (err) {
        console.error("Ошибка при получении данных формы:", err);
        res.status(500).json({ error: err.message });
    }
};