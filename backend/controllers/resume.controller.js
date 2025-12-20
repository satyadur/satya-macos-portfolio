import multer from "multer";
import path from "path";
import fs from "fs";
import Resume from "../models/Resume.js";

// Ensure upload folder exists
const uploadDir = path.join(path.resolve(), "uploads/resume");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, "resume.pdf"); // always overwrite existing resume
  },
});

// Filter only PDFs
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext !== ".pdf") {
    return cb(new Error("Only PDF files are allowed"), false);
  }
  cb(null, true);
};

// Multer middleware
const upload = multer({ storage, fileFilter });
export const uploadResume = upload.single("resume");

// Upload / Update controller
export const uploadResumeController = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    // Save or update in DB
    const newResume = await Resume.findOneAndUpdate(
      { fileName: "resume" },
      {
        fileName: file.originalname,
        url: `/uploads/resume/${file.filename}`,
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "Resume uploaded", resume: newResume });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Get resume URL controller
export const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne();
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    res.json({ url: resume.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
