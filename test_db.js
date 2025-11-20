const mysql = require("mysql2/promise");

async function testDB() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "111826",
      database: "travel_app",
    });

    console.log("Connected to database");

    // Check if users table exists
    const [rows] = await connection.execute("SHOW TABLES LIKE 'users'");
    if (rows.length === 0) {
      console.log("Users table does not exist");
    } else {
      console.log("Users table exists");
    }

    // Try to select from users
    const [users] = await connection.execute(
      "SELECT COUNT(*) as count FROM users"
    );
    console.log(`Users count: ${users[0].count}`);

    await connection.end();
  } catch (err) {
    console.error("DB test error:", err);
  }
}

testDB();
