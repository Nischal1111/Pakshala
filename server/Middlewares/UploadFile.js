// import {v2 as cloudinary} from 'cloudinary';
const cloudinary = require('cloudinary').v2;

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

if(!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error('Cloudinary config not found');
    process.exit(1);
}

const uploadFile = async (file) => {
    try {
        const uploadResult = await cloudinary.uploader.upload(file, {
            folder:"menus"
        });
        if(!uploadResult) {
            throw new Error('Error uploading file');
        }
        // console.log(uploadResult);
        return uploadResult;
    } catch (error) {
        console.log("Error on cloudinary :",error);
    }
}

module.exports = uploadFile;
