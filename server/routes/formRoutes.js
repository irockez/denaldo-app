const express = require("express");
const router = express.Router();
const formController = require("../controllers/formController");
const { saveReport } = require("../controllers/reportController");

router.post("/submit", formController.submitForm);
router.get("/data", formController.getAllData);
router.post("/save", saveReport); // Этот маршрут будет сохранять данные

module.exports = router;