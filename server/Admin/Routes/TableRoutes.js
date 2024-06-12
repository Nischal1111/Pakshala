
const express = require('express');
const tableRoutes = express.Router();

const multer = require('multer');

const uploader= multer({
    storage: multer.diskStorage({})
});


const {
  addTableItem ,
  getTableItems ,
  deleteTableItem
} = require('../Controllers/TableControl');



// adding menu item
tableRoutes.post('/add-table-item', uploader.single('img') ,addTableItem);

// get all menu items
tableRoutes.get('/get-table-items', getTableItems);

// delete menu item
tableRoutes.delete('/delete-table-item/:id', deleteTableItem);




module.exports = tableRoutes;