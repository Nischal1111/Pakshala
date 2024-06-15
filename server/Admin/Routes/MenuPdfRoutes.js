const express = require('express');
const MenuPdfRoutes = express.Router();

const {
    addMenuPdf,
    getMenuPdfs,
    deleteMenuPdf
} =  require('../Controllers/MenuPdfControl');

const multer = require('multer');

const uploader = multer({
    storage: multer.diskStorage({})
});


// Get all menu pdfs
MenuPdfRoutes.route('/get-menu-pdf').get(getMenuPdfs);


// add menu pdf
MenuPdfRoutes.route('/add-menu-pdf').post(uploader.single('file') ,addMenuPdf);


// delete menu pdf
MenuPdfRoutes.route('/delete-menu-pdf/:id').delete(deleteMenuPdf);


module.exports = MenuPdfRoutes;