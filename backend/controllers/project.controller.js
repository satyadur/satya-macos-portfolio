import Project from "../models/Project.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

export const createProject = async (req, res) => {
  try {
    let thumbnailData = null;

    if (req.file) {
      const upload = await uploadToCloudinary(req.file.buffer);
      thumbnailData = {
        url: upload.secure_url,
        public_id: upload.public_id,
      };
    }

    const project = await Project.create({
      title: req.body.title,
      description: req.body.description
        ? req.body.description.split(",").map(s => s.trim())
        : [],
      techStack: req.body.techStack
        ? req.body.techStack.split(",").map(s => s.trim())
        : [],
      liveUrl: req.body.liveUrl,
      videoUrl: req.body.videoUrl,
      windowPosition: req.body.windowPosition,
      thumbnail: thumbnailData,
    });

    res.status(201).json(project);
  } catch (err) {
    console.error("CREATE PROJECT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* READ */
export const getProjects = async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
};

/* UPDATE */
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Not found" });

    let thumbnailData = project.thumbnail;

    if (req.file) {
      // Delete old image
      if (project.thumbnail?.public_id) {
        await cloudinary.uploader.destroy(project.thumbnail.public_id);
      }

      const upload = await uploadToCloudinary(req.file.buffer);
      thumbnailData = {
        url: upload.secure_url,
        public_id: upload.public_id,
      };
    }

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description
          ? req.body.description.split(",").map(s => s.trim())
          : [],
        techStack: req.body.techStack
          ? req.body.techStack.split(",").map(s => s.trim())
          : [],
        liveUrl: req.body.liveUrl,
        videoUrl: req.body.videoUrl,
        windowPosition: req.body.windowPosition,
        thumbnail: thumbnailData,
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error("UPDATE PROJECT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};



/* DELETE */
export const deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project?.thumbnail?.public_id) {
    await cloudinary.uploader.destroy(project.thumbnail.public_id);
  }

  await Project.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
