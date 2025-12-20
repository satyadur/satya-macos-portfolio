import express from "express";
import { upload } from "../utils/upload.js";
import { createBlog, getBlogs } from "../controllers/blog.controller.js";

const router = express.Router();

router.post("/", upload.single("image"), createBlog);
router.get("/", getBlogs);

export default router;
