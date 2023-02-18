require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_CONNECTION_URL } = process.env;

const sequelize = new Sequelize(DB_CONNECTION_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
