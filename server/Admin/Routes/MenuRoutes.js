
const express = require('express');
const adminRoutes = express.Router();

const multer = require('multer');

const uploader= multer({
    storage: multer.diskStorage({})
});


const {
  addMenuItem ,
  getMenuItems 
} = require('../Controllers/MenuControl');


// adding menu item
adminRoutes.post('/add-menu-item', uploader.single('img') ,addMenuItem);

// get all menu items
adminRoutes.get('/get-menu-items', getMenuItems);



module.exports = adminRoutes;