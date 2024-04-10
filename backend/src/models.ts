import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
  image: { type: String, required: true },
  description: { type: String },
  isliked: { type: String, default: false },
});
export const Media = mongoose.model("Media", mediaSchema);
