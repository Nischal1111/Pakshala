const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    room_name: {
        type: String,
        required: true
    },
    room_price: {
        type: Number,
        required: true
    },
    room_image1: {
        type: String,
        required: true
    },
    room_image2: {
        type: String,
        required: true
    },
    room_image3: {
        type: String,
        required: true
    },
    room_image4: {
        type: String,
        required: true
    },
    room_offer_price_percentage: {
        type: Number,
        default: 0,
        required: true
    },
    room_category: {
        type: String,
        required: true
    },
    isOfferActive: {
        type: Boolean,
        default: false
    },
    isRoomBooked: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
});


const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
