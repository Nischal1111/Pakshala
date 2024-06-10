
const express = require('express');
const adminRoutes = express.Router();

const multer = require('multer');

const uploader= multer({
    storage: multer.diskStorage({})
});


const {
  addMenuItem  
} = require('../Controllers/MenuControl');


// adding menu item
adminRoutes.post('/add-menu-item', uploader.single('img') ,addMenuItem);



module.exports = adminRoutes;