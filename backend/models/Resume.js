import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: String, // optional: admin username or ID
    },
  },
  { timestamps: true }
);

export default mongoose.model("Resume", ResumeSchema);
