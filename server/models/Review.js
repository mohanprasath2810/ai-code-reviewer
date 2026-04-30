const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Review = sequelize.define("Review", {
  language: { type: DataTypes.STRING, allowNull: false },
  code:     { type: DataTypes.TEXT,   allowNull: false },
  review:   { type: DataTypes.TEXT,   allowNull: false },
});

module.exports = Review;