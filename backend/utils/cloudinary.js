const cloudinary = require('cloudinary').v2;

// Configure Cloudinary (replace with your own credentials)
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_KEY_SECRET
});

// Function to upload image to Cloudinary
const uploadImageToCloudinary = async (imageFile) => {
    try {
        const result = await cloudinary.uploader.upload(imageFile);
        return result.secure_url; // Return the secure URL of the uploaded image
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        throw error;
    }
};

module.exports = { uploadImageToCloudinary };
