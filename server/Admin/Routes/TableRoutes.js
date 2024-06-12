
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



// adding roomitem
tableRoutes.post('/add-table-item', uploader.single('img') ,addTableItem);

// get all room items
tableRoutes.get('/get-table-items', getTableItems);

// delete room item
tableRoutes.delete('/delete-table-item/:id', deleteTableItem);




module.exports = tableRoutes;