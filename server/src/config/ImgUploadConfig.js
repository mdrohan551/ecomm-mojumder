// ImgUploadConfig.js
import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET_KEY } from "./Config.js";

// Cloudinary config
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET_KEY,
  secure: true
});

// Upload options
const options = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto"
};

// Upload image (base64 or URL)
export const uploadImgServer = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, options, (error, result) => {
      if (result && result.secure_url) {
        return resolve({
          secure_url: result.secure_url,
          public_id: result.public_id
        });
      }
      return reject({ message: error?.message || "Image upload failed" });
    });
  });
};

// Delete image by publicId
export const deleteCloudinary = (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, { resource_type: "image" }, (error, result) => {
      if (result && (result.result === "ok" || result.result === "deleted")) {
        return resolve({ message: "success delete" });
      }
      return reject(error || new Error("Image delete failed"));
    });
  });
};
