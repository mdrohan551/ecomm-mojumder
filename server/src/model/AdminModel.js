import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  adminName: { type: String, required: true },
  email: { type: String, required: true },
}, { timestamps: true,versionKey:false });

export default mongoose.model("Admin", adminSchema);