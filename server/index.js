const express = require("express");
const cors = require("cors");
require("dotenv").config();

const reviewRoutes = require("./routes/review");
const historyRoutes = require("./routes/history");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/review", reviewRoutes);
app.use("/api/history", historyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));