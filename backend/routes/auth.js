const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";
const TOKEN_EXPIRES_IN = "7d";

// function roleRedirect(userType) {
//   // Map roles to frontend pages served statically by Express
//   return userType === "guider" ? "/pages/home.html" : " /pages/GuiderDash.html";
// }

function roleRedirect(userType) {
  // Check if the user is specifically a 'guider'
  if (userType === "guider") {
    return "/pages/GuiderDash.html";
  }

  // Everyone else (travelers) goes to home
  return "/pages/home.html";
}

function issueToken(user) {
  return jwt.sign(
    {
      sub: user.user_id,
      username: user.username,
      role: user.user_type,
    },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRES_IN }
  );
}

function normalizeUserType(raw) {
  if (!raw) return "traveler";
  const v = String(raw).trim().toLowerCase();
  // DB schema uses 'traveler' (US spelling)
  if (v === "guider" || v === "guide") return "guider";
  return "traveler";
}

function pickIdentifier(body) {
  return (
    body.emailOrUsername ||
    body.identifier ||
    body.email ||
    body.username ||
    ""
  ).trim();
}

// POST /api/auth/signup
// Body: { username, email, password, full_name, phone?, user_type: 'traveler'|'guider' }
router.post("/signup", async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      full_name,
      phone = null,
      user_type,
    } = req.body;

    const normalizedType = normalizeUserType(user_type);

    if (!username || !email || !password || !full_name) {
      return res.status(400).json({
        success: false,
        message: "username, email, full_name and password are required",
      });
    }

    const conn = db.promise();

    // Check duplicates
    const [existing] = await conn.query(
      "SELECT user_id FROM users WHERE email = ? OR username = ? LIMIT 1",
      [email, username]
    );
    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email or username already in use",
      });
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Insert user
    const [result] = await conn.execute(
      "INSERT INTO users (username, email, password_hash, full_name, phone, user_type) VALUES (?, ?, ?, ?, ?, ?)",
      [username, email, password_hash, full_name, phone, normalizedType]
    );

    const user_id = result.insertId;

    // If guider, create minimal guider row
    if (normalizedType === "guider") {
      await conn.execute("INSERT INTO guiders (user_id) VALUES (?)", [user_id]);
    }

    const user = {
      user_id,
      username,
      email,
      user_type: normalizedType,
      full_name,
      phone,
    };

    const token = issueToken({ user_id, username, user_type: normalizedType });

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      redirect: roleRedirect(normalizedType),
      token,
      user: {
        id: user_id,
        username,
        email,
        role: normalizedType,
        full_name,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// POST /api/auth/login
// Body: { emailOrUsername | email | username, password }
router.post("/login", async (req, res) => {
  try {
    const identifier = pickIdentifier(req.body);
    const { password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: "identifier (email or username) and password are required",
      });
    }

    const conn = db.promise();

    const [rows] = await conn.query(
      "SELECT user_id, username, email, password_hash, user_type, full_name FROM users WHERE email = ? OR username = ? LIMIT 1",
      [identifier, identifier]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = issueToken(user);

    return res.json({
      success: true,
      message: "Login successful",
      redirect: roleRedirect(user.user_type),
      token,
      user: {
        id: user.user_id,
        username: user.username,
        email: user.email,
        role: user.user_type,
        full_name: user.full_name,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;
