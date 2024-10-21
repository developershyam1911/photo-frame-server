import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: "dmping7k9",
  api_key: "825397891118414",
  api_secret: "vDXcdbDdZQMuukVSgZkXtdPxHCs",

  // cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  // api_key: process.env.CLOUDINARY_API_KEY,
  // api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadOnCloudinary = async (localFilePath, retries = 3, delay = 3000) => {
  console.log(localFilePath, "localfile coloud");
  try {
    if (!localFilePath) return null;
    // Upload file to Cloudinary with increased timeout
    const res = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      timeout: 120000, // Set timeout to 60 seconds
    });
    console.log("File URL on Cloudinary:", res.url);
    fs.unlinkSync(localFilePath); // Remove file from server
    return res;
  } catch (err) {
    fs.unlinkSync(localFilePath); // Remove file from server
    console.log("File uploading to Cloudinary error:", err);

    // Retry logic
    if (retries > 0 && err.http_code === 499) {
      console.log(`Retrying upload... Attempts remaining: ${retries}`);
      await new Promise((resolve) => setTimeout(resolve, delay)); // Delay before retry
      return uploadOnCloudinary(localFilePath, retries - 1, delay);
    }

    throw err;
  }
};
const uploadMultipleOnCloudinary = async (
  localFilePaths,
  retries = 3,
  delay = 3000
) => {
  const uploadPromises = localFilePaths.map(async (path) => {
    const res = await uploadOnCloudinary(path, retries, delay);
    return res.url;
  });

  try {
    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (err) {
    console.log("Error uploading multiple images to Cloudinary:", err);
    throw err;
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
  }
};
export { uploadOnCloudinary, deleteFromCloudinary, uploadMultipleOnCloudinary };
