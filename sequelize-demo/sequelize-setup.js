// sequelize-setup.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("test_db", "root", "redApple6^", {
  host: "localhost",
  dialect: "mysql",
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();
