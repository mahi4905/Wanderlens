import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Lazily configure cloudinary to ensure env vars are loaded first
const getCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  return cloudinary;
};

const uploadOnCloudinary = async (localFilePath, resourceType = "auto") => {
  try {
    if (!localFilePath) return null;

    if (!fs.existsSync(localFilePath)) {
      console.error("[Cloudinary] File not found:", localFilePath);
      return null;
    }

    const cloud = getCloudinary();
    const response = await cloud.uploader.upload(localFilePath, {
      resource_type: resourceType,
      folder: "wanderlens",
    });

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.error("[Cloudinary] Upload error:", error.message);
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteFromCloudinary = async (publicId, resourceType = "image") => {
  try {
    if (!publicId) return null;
    const cloud = getCloudinary();
    const result = await cloud.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    return result;
  } catch (error) {
    console.error("[Cloudinary] Delete error:", error.message);
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
