
const express = require('express');
const roomRoutes = express.Router();

const multer = require('multer');

const uploader= multer({
    storage: multer.diskStorage({})
});


const {
  addRoom,
  getRooms,
  deleteRoom
} = require('../Controllers/RoomControl');



// adding room item


  roomRoutes.route('/add-room').post(
    uploader.fields([
      { name: 'img1', maxCount: 1 },
      { name: 'img2', maxCount: 1 },
      { name: 'img3', maxCount: 1 },
      { name: 'img4', maxCount: 1 }
    ]),
    addRoom);

// get all room items
roomRoutes.get('/get-rooms', getRooms);

// delete room item
roomRoutes.delete('/delete-room/:id', deleteRoom);




module.exports = roomRoutes;