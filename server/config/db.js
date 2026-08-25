const { Sequelize } = require("sequelize");

if (!process.env.DATABASE_URL) {
  console.error("FATAL: DATABASE_URL is not set in environment variables.");
  process.exit(1);
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    // Required for Render PostgreSQL (and most cloud-hosted Postgres providers)
    ssl: {
      require: true,
      rejectUnauthorized: false, // Render uses self-signed certs
    },
  },
});

module.exports = sequelize;
