const mysql = require("mysql2/promise");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "111826",
  database: "travel_app",
});

db.then(() => {
  console.log("MySQL connected");
}).catch((err) => {
  console.error("MySQL connection failed:", err);
  process.exit(1);
});

module.exports = db;
