const express = require("express");
const router = express.Router();
const formController = require("../controllers/formController");

router.post("/submit", formController.submitForm);
router.get("/data", formController.getAllData);

module.exports = router;