const RoomReserve = require('../Schemas/RoomReserve');
const Room = require('../Schemas/Room');
const { sendRoomBookingMail } = require('../../Utils/MailSend');



// Add a new room reservation

const addRoomReserve = async (req, res) => {
    try {
        const roomId = req.params.id;
        const { name, contact, checkInDate, checkOutDate } = req.body;

        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        const reserveRoom = new RoomReserve({
            name,
            contact,
            checkInDate,
            checkOutDate,
            roomId
        });

        const reserve = await reserveRoom.save();

        if (!reserve) {
            return res.status(400).json({ success: false, message: 'Room reservation failed' });
        }

        await sendRoomBookingMail({ bookingDetails: reserve });

        res.status(201).json({ success: true, message: 'Room reserved successfully', reserve });

        
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error on Add room reservation', error: error });     
    }
}



// Get all the room reservations

const getRoomReserves = async (req, res) => {
    try {
        const reserves = await RoomReserve.find().populate('roomId');
        if (!reserves) {
            return res.status(404).json({ message: 'No room reservations found' });
        }
        res.status(200).json({ success: true, reserves });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error on Get room reservations', error: error });
    }
}

const acceptRoomReservation = async(req,res) =>{
    try {
        const roomReservationId = req.params.id;

        const acceptRoom = RoomReserve.findByIdAndUpdate(roomReservationId,{
            status: "Approved"
        },
    {
        new: true
    })

    if (!acceptRoom) {
        return res.status(404).json({success:false, message: "Room reservation not found"})
        }

        res.status(200).json({success:true, message: "Room reservation accepted" })
    } catch (error) {
        res.status(400).json({success:false,message:"error",error})
    }
}

const rejectRoomReservation = async(req,res)=>{
    try {
        const roomReservationId = req.params.id;

        const rejectRoom = RoomReserve.findByIdAndUpdate(roomReservationId,{
            status: "Rejected"
        },{
            new: true
        })

        if(!rejectRoom){
            return res.status(404).json({success:false, message: "Room reservation not found"})
        }

        res.status(200).json({success:true, message: "Room reservation rejected" })
    } catch (error) {
        res.status(400).json({success:false,message:"error",error})
    }
}



module.exports = {
    addRoomReserve,
    getRoomReserves,
    acceptRoomReservation,
    rejectRoomReservation
}