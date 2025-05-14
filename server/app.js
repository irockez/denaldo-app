// server/app.js

const express = require("express"); // Импортируем библиотеку Express для создания серверных приложений
const cors = require("cors"); // Импортируем CORS для разрешения кросс-доменных запросов
console.log('Подключаю маршруты с пути:', __dirname + '/routes/formRoutes');
const formRoutes = require("./routes/formRoutes"); // Импортируем маршруты из файла formRoutes.js

const app = express(); // Создаем приложение Express
app.use(cors()); // Включаем CORS для разрешения запросов с других доменов
app.use(express.json()); // Включаем парсинг JSON-данных в теле запроса
app.use("/api", formRoutes); // Подключаем маршруты, которые начинаются с "/api"

// Обработчик GET-запроса на корневой маршрут
app.get('/', (req, res) => {
    res.send('API работает!'); // Ответ на GET-запрос с текстом "API работает!"
});

// Обработчик POST-запроса на маршрут "/api/submit"
app.post('/api/submit', (req, res) => {
    console.log('🎯 Полученные данные:', req.body); // Логируем данные, полученные в теле запроса

    res.json({ success: true, message: 'Данные пришли, всё норм!' }); // Ответ с подтверждением, что данные получены
});

// Установка порта для сервера: используем переменную окружения PORT или 3000 по умолчанию
const PORT = process.env.PORT || 3000;

// Запуск сервера на указанном порту
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`); // Логируем сообщение, когда сервер запущен
});