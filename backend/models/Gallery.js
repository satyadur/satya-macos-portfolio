import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema(
  {
    image: String,
    category: {
      type: String,
      enum: ["library", "memories", "places", "people", "favorites"],
      default: "library",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Gallery", GallerySchema);
