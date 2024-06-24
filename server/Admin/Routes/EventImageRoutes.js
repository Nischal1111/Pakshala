const express = require('express');
const eventImageRoutes = express.Router();
const jwtAuth = require('../Middleware/authMiddleware');
const multer = require('multer');

const uploader = multer({
    storage: multer.diskStorage({}),
});

const { 
    addImages,
    deleteImage
 } = require('../Controllers/EventImageControl');

eventImageRoutes.use(jwtAuth); // all routes are secured

// adding event images
eventImageRoutes.route('/add-event-images').post(
    uploader.array('images', 10), // handle up to 10 images at once, adjust as needed
    addImages
);

// delete event image
eventImageRoutes.delete('/delete-event-image/:id', deleteImage);


module.exports = eventImageRoutes;
