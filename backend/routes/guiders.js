const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET /api/guiders - Get all guiders with their details
router.get("/", async (req, res) => {
  try {
    const conn = db.promise();

    const [guiders] = await conn.query(`
      SELECT
        g.guider_id,
        g.user_id,
        g.specialization,
        g.experience_years,
        g.languages,
        g.hourly_rate,
        g.rating,
        g.total_reviews,
        u.full_name,
        u.profile_image,
        u.bio,
        u.location
      FROM guiders g
      JOIN users u ON g.user_id = u.user_id
      WHERE u.is_active = 1
      ORDER BY g.rating DESC, g.total_reviews DESC
    `);

    return res.json({
      success: true,
      guiders: guiders,
    });
  } catch (err) {
    console.error("Get guiders error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// GET /api/guiders/:id - Get specific guider details
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const conn = db.promise();

    const [guiders] = await conn.query(
      `
      SELECT
        g.guider_id,
        g.user_id,
        g.specialization,
        g.experience_years,
        g.languages,
        g.hourly_rate,
        g.rating,
        g.total_reviews,
        u.full_name,
        u.email,
        u.phone,
        u.profile_image,
        u.bio,
        u.location,
        u.created_at
      FROM guiders g
      JOIN users u ON g.user_id = u.user_id
      WHERE g.guider_id = ? AND u.is_active = 1
    `,
      [id]
    );

    if (guiders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Guider not found",
      });
    }

    return res.json({
      success: true,
      guider: guiders[0],
    });
  } catch (err) {
    console.error("Get guider error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;
