const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    public_id: {
        type: String,
        required: true
    }
}, { _id: false }); 

const RoomSchema = new mongoose.Schema({
    room_name: {
        type: String,
        required: true
    },
    room_price: {
        type: Number,
        required: true
    },
    room_guests: {
        type: Number,
        required: true
    },
    room_image1: {
        type: ImageSchema,
        required: true
    },
    room_image2: {
        type: ImageSchema,
        required: true
    },
    room_image3: {
        type: ImageSchema,
        required: true
    },
    room_image4: {
        type: ImageSchema,
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
}, {
    timestamps: true
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
