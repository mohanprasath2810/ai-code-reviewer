const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/db");
const reviewRoutes = require("./routes/review");
const historyRoutes = require("./routes/history");

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.use("/api/review", reviewRoutes);
app.use("/api/history", historyRoutes);

// Health check endpoint — useful for Render's uptime checks
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 5000;

// Authenticate DB connection and sync models before accepting requests
sequelize
  .authenticate()
  .then(() => {
    console.log("DB connection established.");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("DB synced.");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err.message);
    console.error("Server will NOT start. Fix DATABASE_URL and restart.");
    process.exit(1);
  });
