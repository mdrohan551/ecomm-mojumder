import express from "express";
import { createAdmin, getadmin, updateAdmin } from "../controller/admincontroller.js";
import { createFlashSaleProduct, deleteFlashSaleProduct, getFlashSaleProducts, updateFlashSaleProduct } from "../controller/createFlashsale.js";
import { createSlide, deleteSlide, getSlides, updateSlide } from "../controller/slidercontroller.js";
import { deleteImageCloudinary, uploadeImageServices } from "../controller/UploadImg.js";

const router = express.Router();

// ================= Admin Routes =================
router.post("/admin-data", createAdmin); // Create admin
router.get("/admin", getadmin);          // Get admin
router.put("/admin/:id", updateAdmin);   // Update admin

// ================= Flash Sale Product Routes =================
router.post("/flash-sales", createFlashSaleProduct); // Create product
router.get("/flash-sales", getFlashSaleProducts);    // Get all products
router.put("/flash-sales/:id", updateFlashSaleProduct); // Update product
router.delete("/flash-sales/:id", deleteFlashSaleProduct); // Delete product

// ================= Slide Routes =================
router.post("/slides", createSlide);       // Create slide
router.get("/slides", getSlides);          // Get all slides
router.put("/slides/:id", updateSlide);    // Update slide
router.delete("/slides/:id", deleteSlide); // Delete slide

// ================= Image Upload Routes =================
router.post("/upload", uploadeImageServices); // Upload image
router.delete("/upload/:publicId", deleteImageCloudinary); // Delete image - এটিই Cloudinary ডিলিট ফাংশন কল করবে

export default router;