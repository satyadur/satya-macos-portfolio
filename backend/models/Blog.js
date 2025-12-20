import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: String,
    image: String,
    link: String,
    publishedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Blog", BlogSchema);
