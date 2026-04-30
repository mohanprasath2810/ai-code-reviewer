const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

sequelize.sync({ alter: true })
  .then(() => console.log("DB connected & synced"))
  .catch(err => console.error("DB error:", err));

module.exports = sequelize;