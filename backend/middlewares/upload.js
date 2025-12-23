// middleware/upload.js
import multer from "multer";

export const uploadResume = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      cb(new Error("Only PDFs allowed"));
    } else cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
}).single("resume");
