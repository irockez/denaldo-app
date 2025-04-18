const db = require("../db/database");

exports.submitForm = (req, res) => {
    const { form_type, content } = req.body;
    const created_at = new Date().toISOString();

    const stmt = db.prepare("INSERT INTO form_data (form_type, content, created_at) VALUES (?, ?, ?)");
    stmt.run(form_type, content, created_at, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
};

exports.getAllData = (req, res) => {
    db.all("SELECT * FROM form_data", (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};