import About from "../models/About.js";
import cloudinary from "../config/cloudinary.js";

export const getAbout = async (req, res, next) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (err) {
    next(err);
  }
};

export const upsertAbout = async (req, res, next) => {
  try {
    const about = await About.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );
    res.json(about);
  } catch (err) {
    next(err);
  }
};

// 🔥 Cloudinary upload
export const uploadAboutImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image provided" });
    }

    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      {
        folder: "portfolio/about",
      }
    );

    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    next(err);
  }
};
