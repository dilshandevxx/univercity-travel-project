const express = require("express");
const multer = require("multer");
const path = require("path");
const Gallery = require("../models/gallery");
const { sendResponse, sendError } = require("../utils/response");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../frontend/assets/uploads/"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

// POST /api/gallery/upload - Upload a new photo
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return sendError(res, "No image file provided", 400);
    }

    const { title, description, category, location, photographer, tags } =
      req.body;

    // For now, using a default user_id (1) since authentication isn't implemented yet
    // In a real app, you'd get this from the authenticated user
    const uploaded_by = 1;

    const image_url = `/assets/uploads/${req.file.filename}`;

    const photoData = {
      title: title || null,
      description: description || null,
      image_url,
      category: category || "nature",
      location: location || null,
      photographer: photographer || null,
      uploaded_by,
      tags: tags || null,
    };

    const photoId = await Gallery.createPhoto(photoData);

    sendResponse(
      res,
      "Photo uploaded successfully",
      { photoId, image_url },
      201
    );
  } catch (error) {
    console.error("Upload error:", error);
    sendError(res, "Failed to upload photo", 500);
  }
});

// GET /api/gallery - Get all photos
router.get("/", async (req, res) => {
  try {
    const photos = await Gallery.getAllPhotos();
    sendResponse(res, "Photos retrieved successfully", photos);
  } catch (error) {
    console.error("Get photos error:", error);
    sendError(res, "Failed to retrieve photos", 500);
  }
});

// GET /api/gallery/:id - Get a specific photo
router.get("/:id", async (req, res) => {
  try {
    const photo = await Gallery.getPhotoById(req.params.id);
    if (!photo) {
      return sendError(res, "Photo not found", 404);
    }
    sendResponse(res, "Photo retrieved successfully", photo);
  } catch (error) {
    console.error("Get photo error:", error);
    sendError(res, "Failed to retrieve photo", 500);
  }
});

module.exports = router;
