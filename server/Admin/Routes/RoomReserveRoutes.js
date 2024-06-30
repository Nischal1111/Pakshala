
const express = require('express');
const router = express.Router();

const { 
    addRoomReserve,
    getRoomReserves 
} = require('../Controllers/RoomReserveControl');

const jwtAuth = require('../Middleware/authMiddleware');




//routes

router.post('/request-room-reserve/:id', addRoomReserve);


router.get('/get-room-reserves',jwtAuth ,getRoomReserves);


module.exports = router;