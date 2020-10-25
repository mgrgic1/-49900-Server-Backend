// Module dependencies;
const Sequelize = require("sequelize");

require('dotenv').config();

// This is our entry point, we instantiate the Sequelize instance accordingly
const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://postgres:${process.env.LOCAL_DATABASE_PASSWORD}@localhost/CoinDB`,
  { logging: false }
);

// Export our instance of Sequelize, which will be modified with models
module.exports = db;