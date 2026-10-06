import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloudinary config check:", cloudinary.config());

const uploadImage = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: "portfolio",
        });
        fs.unlink(filePath, (err) => {
            if (err) console.error("Failed to delete local temp file:", err);
        });
        return result.secure_url;
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        fs.unlink(filePath, () => {});
        throw new Error("Image upload failed");
    }
};

export default uploadImage;