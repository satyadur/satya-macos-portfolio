import express from "express";
import { getAbout, upsertAbout, uploadAboutImage } from "../controllers/about.controller.js";
import multer from "multer";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getAbout);
router.post("/", upsertAbout);

// image upload
router.post("/upload", upload.single("image"), uploadAboutImage);

export default router;
