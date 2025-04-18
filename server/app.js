const express = require("express");
const cors = require("cors");
const formRoutes = require("./routes/formRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Сервер работает! 🚀");
});
app.use("/api", formRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});