const mysql = require("./backend/node_modules/mysql2/promise");

async function testQuery() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "111826",
      database: "travel_app",
    });

    const [rows] = await connection.execute(
      "SELECT g.guider_id, g.user_id, g.specialization, g.experience_years, g.languages, g.hourly_rate, g.rating, g.total_reviews, u.full_name, u.profile_image, u.bio, u.location FROM guiders g JOIN users u ON g.user_id = u.user_id WHERE u.is_active = 1 ORDER BY g.rating DESC, g.total_reviews DESC"
    );
    console.log("Guiders data:", rows);

    await connection.end();
  } catch (err) {
    console.error("Error:", err);
  }
}

testQuery();
