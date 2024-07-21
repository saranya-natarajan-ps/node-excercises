// connection-error.js
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "wrongpassword",
  database: "test_db",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    // Additional error handling logic
    return;
  }
  console.log("Connected to the database");
});
