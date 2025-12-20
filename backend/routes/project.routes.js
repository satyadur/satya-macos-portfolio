import express from "express";
import { upload } from "../utils/upload.js";
import { createProject, getProjects, updateProject,
  deleteProject, } from "../controllers/project.controller.js";

const router = express.Router();

router.post("/", upload.single("thumbnail"), createProject);
router.get("/", getProjects);
router.put("/:id", upload.single("thumbnail"), updateProject);
router.delete("/:id", deleteProject);

export default router;
