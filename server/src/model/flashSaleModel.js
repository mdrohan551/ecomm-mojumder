import mongoose from "mongoose";

const flashSaleProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String },
  description: { type: String },
  image: { type: String }, 
  toCartQuantity: { type: Number, default: 1 }, 
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  public_id: { type: String },
  instock: { type: Boolean, default: true },
}, { timestamps: true, versionKey: false });

export default mongoose.model("FlashSaleProduct", flashSaleProductSchema);
