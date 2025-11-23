const mysql = require("./backend/node_modules/mysql2/promise");

async function updateUser() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "111826",
      database: "travel_app",
    });

    // Activate user
    await connection.execute(
      "UPDATE users SET is_active = 1 WHERE username = 'testguider'"
    );
    console.log("User activated");

    // Update guider with rating and reviews
    await connection.execute(
      "UPDATE guiders SET rating = 4.5, total_reviews = 25 WHERE user_id = (SELECT user_id FROM users WHERE username = 'testguider')"
    );
    console.log("Guider updated with rating and reviews");

    await connection.end();
  } catch (err) {
    console.error("Error:", err);
  }
}

updateUser();
