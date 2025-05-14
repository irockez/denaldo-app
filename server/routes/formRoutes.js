const express = require("express");
const router = express.Router(); // Создаем экземпляр роутера Express
const formController = require("../controllers/formController"); // Импортируем контроллеры для обработки запросов

// Маршрут для обработки POST-запроса на отправку формы
router.post("/submit", formController.submitForm);

module.exports = router; // Экспортируем маршруты для использования в основном приложении