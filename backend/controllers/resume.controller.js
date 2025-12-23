// controllers/resume.controller.js
import Resume from "../models/Resume.js";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const resume = await Resume.findOneAndUpdate(
      {},
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
    console.error("Upload error:", error);
    res
      .status(500)
      .json({ message: "Error uploading resume", error: error.message });
  }
};

export const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({});

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Set proper headers
    res.set({
      "Content-Type": resume.contentType || "application/pdf",
      "Content-Length": resume.data.length,
      "Content-Disposition": 'inline; filename="Durga_Satyanarayana_Kudupudi.pdf"',
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    });

    // Send the binary data
    res.send(resume.data);
  } catch (error) {
    console.error("Error fetching resume:", error);
    res.status(500).json({ message: "Error retrieving resume" });
  }
};