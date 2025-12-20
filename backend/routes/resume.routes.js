import express from "express";
import { uploadResume, uploadResumeController, getResume } from "../controllers/resume.controller.js";

const router = express.Router();

// Admin upload
router.post("/upload", uploadResume, uploadResumeController);

// Public get resume
router.get("/", getResume);

export default router;
