import mongoose from "mongoose";

const photoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Photo", photoSchema);
