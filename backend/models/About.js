import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "About me",
    },
    subtitle: {
      type: String,
      required: true,
    },
    description: {
      type: [String],
      required: true,
    },
    images: [
      {
        key: String, // me | casual | conference
        url: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("About", aboutSchema);
