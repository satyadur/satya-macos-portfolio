import mongoose from "mongoose";

const TechStackSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      unique: true, // Frontend, Backend, etc.
      trim: true,
    },
    items: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("TechStack", TechStackSchema);
