// UploadImg.js (Controller) - deleteImageCloudinary ফাংশন
import { deleteCloudinary, uploadImgServer } from "../config/ImgUploadConfig.js"; 

// DELETE /api/v1/upload/:publicId
export const deleteImageCloudinary = async (req, res) => {
    try {
        const { publicId } = req.params;
        if (!publicId) return res.status(400).json({ status: "fail", message: "Missing publicId" });

        // Cloudinary থেকে ডিলিট করার ফাংশন কল করা
        await deleteCloudinary(publicId);

        res.status(200).json({ status: "success", message: "Image deleted successfully from Cloudinary" });
    } catch (err) {
        console.error("Cloudinary Deletion Error:", err);
        res.status(500).json({ status: "error", message: err.message || "Failed to delete image from Cloudinary" });
    }
};

// uploadeImageServices ফাংশনটি আপনার দেওয়া কোড অনুযায়ী
export const uploadeImageServices = async (req, res) => {
    try {
        const { image } = req.body;
        if (!image) return res.status(400).json({ status: "fail", message: "Missing image data" });

        const imgUrl = await uploadImgServer(image);
        if (imgUrl) {
           return res.status(200).json({ status: "success", data: imgUrl });
        }
        return res.status(500).json({ status: "error", message: "Image upload failed" });

    } catch (err) {
        console.error("Image Upload Error:", err);
        return res.status(500).json({ status: "error", message: err.message || "Image upload failed" });
    }
};