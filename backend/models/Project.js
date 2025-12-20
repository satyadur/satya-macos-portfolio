import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: [String],
    techStack: [String],
    liveUrl: String,
    videoUrl: String,
    windowPosition: String,

    thumbnail: {
      url: String,
      public_id: String,
    },

    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Project", ProjectSchema);
