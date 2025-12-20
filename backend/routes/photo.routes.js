import express from "express";
import multer from "multer";
import { getPhotos, uploadPhoto } from "../controllers/photo.controller.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getPhotos);
router.post("/upload", upload.single("image"), uploadPhoto);

export default router;
