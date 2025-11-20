const mysql = require("./backend/node_modules/mysql2/promise");
const bcrypt = require("./backend/node_modules/bcrypt");

async function createTestUser() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "111826",
      database: "travel_app",
    });

    console.log("Connected to database");

    // Hash password
    const password_hash = await bcrypt.hash("password", 10);

    // Insert user
    const [result] = await connection.execute(
      "INSERT INTO users (username, email, password_hash, full_name, phone, user_type, profile_image) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        "testguider",
        "testguider@example.com",
        password_hash,
        "John Doe",
        "+1234567890",
        "guider",
        null,
      ]
    );

    const user_id = result.insertId;
    console.log("User inserted, id:", user_id);

    // Insert guider
    await connection.execute(
      "INSERT INTO guiders (user_id, specialization, experience_years, languages, hourly_rate) VALUES (?, ?, ?, ?, ?)",
      [user_id, "Cultural Tours", 5, "English, Sinhala", 50.0]
    );

    console.log("Test guider created successfully");
    console.log("Username: testguider");
    console.log("Email: testguider@example.com");
    console.log("Password: password");
    console.log("Full Name: John Doe");

    await connection.end();
  } catch (err) {
    console.error("Error creating test user:", err);
  }
}

createTestUser();
