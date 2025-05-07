// server/app.js

const express = require("express");
const cors = require("cors");
const formRoutes = require("./routes/formRoutes"); // Импортируем маршруты

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", formRoutes); // Подключаем маршруты

app.get('/', (req, res) => {
    res.send('API работает!');
});
app.post('/api/submit', (req, res) => {
    console.log('🎯 Полученные данные:', req.body); // <-- Вот тут просто глядишь, что приходит

    res.json({ success: true, message: 'Данные пришли, всё норм!' }); // просто чтобы фронт не ругался
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});