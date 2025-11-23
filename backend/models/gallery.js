const db = require("../config/db");

class Gallery {
  // Create a new photo entry
  static async createPhoto(photoData) {
    const query = `
            INSERT INTO gallery_photos
            (title, description, image_url, category, location, photographer, uploaded_by, tags)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

    const values = [
      photoData.title,
      photoData.description,
      photoData.image_url,
      photoData.category,
      photoData.location,
      photoData.photographer,
      photoData.uploaded_by,
      photoData.tags,
    ];

    try {
      const [result] = await db.execute(query, values);
      return result.insertId;
    } catch (error) {
      console.error("Error creating photo:", error);
      throw error;
    }
  }

  // Get all photos
  static async getAllPhotos() {
    const query = `
            SELECT
                gp.*,
                u.username as uploader_name
            FROM gallery_photos gp
            LEFT JOIN users u ON gp.uploaded_by = u.user_id
            ORDER BY gp.created_at DESC
        `;

    try {
      const [rows] = await db.execute(query);
      return rows;
    } catch (error) {
      console.error("Error getting all photos:", error);
      throw error;
    }
  }

  // Get photo by ID
  static async getPhotoById(photoId) {
    const query = `
            SELECT
                gp.*,
                u.username as uploader_name
            FROM gallery_photos gp
            LEFT JOIN users u ON gp.uploaded_by = u.user_id
            WHERE gp.photo_id = ?
        `;

    try {
      const [rows] = await db.execute(query, [photoId]);
      return rows[0] || null;
    } catch (error) {
      console.error("Error getting photo by ID:", error);
      throw error;
    }
  }

  // Get photos by category
  static async getPhotosByCategory(category) {
    const query = `
            SELECT
                gp.*,
                u.username as uploader_name
            FROM gallery_photos gp
            LEFT JOIN users u ON gp.uploaded_by = u.user_id
            WHERE gp.category = ?
            ORDER BY gp.created_at DESC
        `;

    try {
      const [rows] = await db.execute(query, [category]);
      return rows;
    } catch (error) {
      console.error("Error getting photos by category:", error);
      throw error;
    }
  }

  // Update photo
  static async updatePhoto(photoId, updateData) {
    const fields = [];
    const values = [];

    Object.keys(updateData).forEach((key) => {
      if (updateData[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(updateData[key]);
      }
    });

    if (fields.length === 0) {
      throw new Error("No fields to update");
    }

    const query = `
            UPDATE gallery_photos
            SET ${fields.join(", ")}
            WHERE photo_id = ?
        `;

    values.push(photoId);

    try {
      const [result] = await db.execute(query, values);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error updating photo:", error);
      throw error;
    }
  }

  // Delete photo
  static async deletePhoto(photoId) {
    const query = "DELETE FROM gallery_photos WHERE photo_id = ?";

    try {
      const [result] = await db.execute(query, [photoId]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error deleting photo:", error);
      throw error;
    }
  }
}

module.exports = Gallery;
