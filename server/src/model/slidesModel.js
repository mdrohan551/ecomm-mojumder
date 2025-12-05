import mongoose from "mongoose";

const slideSchema = new mongoose.Schema({
  tag: { type: String },
  title: { type: String },
  subtitle: { type: String },
  description: { type: String },
  image: { type: String },
  alt: { type: String },
  discountPercentage: { type: Number, default: null }, // optional
}, { timestamps: true, versionKey: false });

export default mongoose.model("Slide", slideSchema);
