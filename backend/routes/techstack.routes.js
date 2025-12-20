import express from "express";
import {
  upsertTechStack,
  getTechStacks,
} from "../controllers/techstack.controller.js";

const router = express.Router();

// Admin / CMS usage
router.post("/", upsertTechStack);

// Public usage
router.get("/", getTechStacks);

export default router;
