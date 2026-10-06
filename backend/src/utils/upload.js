import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = (buffer) =>
    new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream({ folder: "portfolio" }, (error, result) => {
                if (error) {
                    console.error("Error uploading image to Cloudinary:", error);
                    return reject(new Error("Image upload failed"));
                }
                resolve(result.secure_url);
            })
            .end(buffer);
    });

export default uploadImage;