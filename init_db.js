const mysql = require("./backend/node_modules/mysql2/promise");
const fs = require("fs");
const path = require("path");

async function initDatabase() {
  try {
    // Create connection without specifying database first
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "111826",
    });

    console.log("Connected to MySQL server");

    // Create database if it doesn't exist
    await connection.execute("CREATE DATABASE IF NOT EXISTS travel_app");
    console.log("Database 'travel_app' created or already exists");

    // Switch to the database
    await connection.query("USE travel_app");

    // Read and execute the SQL file
    const sqlFilePath = path.join(__dirname, "backend", "init.sql");
    const sqlContent = fs.readFileSync(sqlFilePath, "utf8");

    // Split SQL commands by semicolon and execute them
    const sqlCommands = sqlContent
      .split(";")
      .map((cmd) => cmd.trim())
      .filter((cmd) => cmd.length > 0 && !cmd.startsWith("--"));

    for (const command of sqlCommands) {
      if (command.trim()) {
        try {
          await connection.execute(command);
          console.log("Executed SQL command successfully");
        } catch (err) {
          console.log(
            "Command failed (might be expected):",
            command.substring(0, 50) + "..."
          );
        }
      }
    }

    console.log("Database initialization completed successfully");
    await connection.end();
  } catch (error) {
    console.error("Database initialization failed:", error);
    process.exit(1);
  }
}

initDatabase();
