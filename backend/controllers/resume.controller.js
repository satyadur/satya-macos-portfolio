// controllers/resumeController.js
import Resume from "../models/Resume.js";
import fs from "fs";
import path from "path";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Since it's a single resume, we'll update or insert (upsert)
    const resume = await Resume.findOneAndUpdate(
      {}, // No specific filter, assumes single document
      {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      { upsert: true, new: true }
    );

    res
      .status(200)
      .json({ message: "Resume uploaded successfully", resumeId: resume._id });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error uploading resume", error: error.message });
  }
};

const RESUME_PATH = path.join(process.cwd(), "uploads", "resume.pdf");

export const getResume = (req, res) => {
  if (!fs.existsSync(RESUME_PATH)) {
    return res.status(404).send("Resume not found");
  }

  const stat = fs.statSync(RESUME_PATH);

  res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Length": stat.size,
    "Content-Disposition": "inline; filename=resume.pdf",
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate", // disable caching
    Pragma: "no-cache",
    Expires: 0,
  });

  fs.createReadStream(RESUME_PATH).pipe(res);
};
