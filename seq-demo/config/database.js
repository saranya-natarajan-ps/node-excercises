const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("test_db", "root", "redApple6^", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
