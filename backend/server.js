import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import visitRoutes from "./routes/visit.routes.js";
import projectRoutes from "./routes/project.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import galleryRoutes from "./routes/gallery.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import techStackRoutes from "./routes/techstack.routes.js";
import resumeRoutes from "./routes/resume.routes.js"
import aboutRoutes from "./routes/about.routes.js"
import path from "path";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
});
app.set("trust proxy", true);

app.use("/api/projects", projectRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/tech-stack", techStackRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/uploads", express.static(path.join(path.resolve(), "uploads")));
app.use("/api/visit", visitRoutes);

app.get("/", (_, res) => res.send("🚀 Portfolio Backend Running"));

app.listen(process.env.PORT, () =>
  console.log(`✅ Server running on port ${process.env.PORT}`)
);
