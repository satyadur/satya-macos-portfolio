import mongoose from "mongoose";

const visitSchema = new mongoose.Schema(
  {
    ip: String,
    city: String,
    country: String,
    browser: String,
    os: String,
    device: String,
    userAgent: String,
    visitedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Visit", visitSchema);
