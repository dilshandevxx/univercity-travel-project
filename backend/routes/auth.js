const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../../frontend/assets/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

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
// Body: JSON for travelers, FormData for guiders with { username, email, password, full_name, phone?, user_type, dob?, gender?, experience?, languages?, specialization?, photo?, idproof? }
router.post("/signup", async (req, res) => {
  console.log("Signup request received");
  console.log("Content-Type:", req.headers["content-type"]);

  // Check if it's FormData (multipart/form-data) or JSON
  const isFormData =
    req.headers["content-type"] &&
    req.headers["content-type"].startsWith("multipart/form-data");

  if (isFormData) {
    // Use multer for FormData
    upload.fields([
      { name: "photo", maxCount: 1 },
      { name: "idproof", maxCount: 1 },
    ])(req, res, async (err) => {
      if (err) {
        console.error("Multer error:", err);
        return res.status(400).json({
          success: false,
          message: "File upload error",
        });
      }
      await handleSignup(req, res);
    });
  } else {
    // Handle JSON directly
    await handleSignup(req, res);
  }
});

async function handleSignup(req, res) {
  console.log("Signup request received");
  try {
    const {
      username,
      email,
      password,
      full_name,
      phone = null,
      user_type,
      dob,
      gender,
      experience,
      languages,
      specialization,
    } = req.body;

    console.log("Body:", { username, email, full_name, user_type });

    const normalizedType = normalizeUserType(user_type);
    console.log("Normalized type:", normalizedType);

    if (!username || !email || !password || !full_name) {
      return res.status(400).json({
        success: false,
        message: "username, email, full_name and password are required",
      });
    }

    // For guiders, require profile photo
    if (normalizedType === "guider" && !req.files.photo) {
      return res.status(400).json({
        success: false,
        message: "Profile picture is required for guiders",
      });
    }

    console.log("Getting db connection");
    const conn = await db;

    console.log("Checking duplicates");
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

    console.log("Hashing password");
    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Handle file uploads
    let profileImagePath = null;
    if (req.files && req.files.photo && req.files.photo[0]) {
      profileImagePath = "/assets/uploads/" + req.files.photo[0].filename;
    }

    console.log("Inserting user");
    // Insert user
    const [result] = await conn.execute(
      "INSERT INTO users (username, email, password_hash, full_name, phone, user_type, profile_image) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        username,
        email,
        password_hash,
        full_name,
        phone,
        normalizedType,
        profileImagePath,
      ]
    );

    const user_id = result.insertId;
    console.log("User inserted, id:", user_id);

    // If guider, create guider row with additional details
    if (normalizedType === "guider") {
      console.log("Inserting guider");
      await conn.execute(
        "INSERT INTO guiders (user_id, specialization, experience_years, languages, hourly_rate) VALUES (?, ?, ?, ?, ?)",
        [
          user_id,
          specialization || null,
          experience || 0,
          languages || null,
          0.0,
        ]
      );
    }

    const user = {
      user_id,
      username,
      email,
      user_type: normalizedType,
      full_name,
      phone,
      profile_image: profileImagePath,
    };

    console.log("Issuing token");
    const token = issueToken({
      user_id,
      username,
      user_type: normalizedType,
    });

    console.log("Signup successful");
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
        profile_image: profileImagePath,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
}

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

    const conn = await db;

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
