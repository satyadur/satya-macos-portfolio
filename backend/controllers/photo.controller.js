import Photo from "../models/Photo.js";
import cloudinary from "../config/cloudinary.js";

// Get all photos
export const getPhotos = async (req, res, next) => {
  try {
    const photos = await Photo.find().sort({ createdAt: -1 });
    res.json(photos);
  } catch (err) {
    next(err);
  }
};

// Upload new photo
export const uploadPhoto = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No image provided" });

    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      { folder: "portfolio/photos" }
    );

    const photo = new Photo({
      title: req.body.title || "Untitled",
      url: result.secure_url,
      description: req.body.description || "",
    });

    await photo.save();
    res.json(photo);
  } catch (err) {
    next(err);
  }
};

// Delete a photo
export const deletePhoto = async (req, res, next) => {
  try {
    const { id } = req.params;

    const photo = await Photo.findById(id);
    if (!photo) return res.status(404).json({ message: "Photo not found" });

    // Extract public_id from Cloudinary URL
    const publicId = photo.url.split("/").pop().split(".")[0];

    await cloudinary.uploader.destroy(`portfolio/photos/${publicId}`);
    await Photo.findByIdAndDelete(id);

    res.json({ message: "Photo deleted successfully" });
  } catch (err) {
    next(err);
  }
};