
const TableReserve = require('../Schemas/TableReserve');
const Table = require('../Schemas/Table');
const { sendTableBookingMail } = require('../../Utils/MailSend');


// Add a new table reservation

const addTableReserve = async (req, res) => {
    try {
        const tableId = req.params.id;
        const { name, contact, email, date, time, guests } = req.body;

        const table = await Table.findById(tableId);
        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }

        const reserveTable = new TableReserve({
            name,
            contact,
            email,
            reserveDate:date,
            reserveTime : time,
            guestsNumber : guests,
            tableId
        });

        const reserve = await reserveTable.save();

        if (!reserve) {
            return res.status(400).json({ success: false, message: 'Table reservation failed' });
        }
        await sendTableBookingMail({ bookingDetails: reserve });

        res.status(201).json({ success: true, message: 'Table reserved successfully', reserve });
        
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error on Add table reservation', error: error });
    }
}


// Get all the table reservations

const getTableReserves = async (req, res) => {
    try {
        const reserves = await TableReserve.find({}).populate('tableId');
        if (reserves.length === 0) {
            return res.status(404).json({ message: 'No table reservations found' });
        }
        res.status(200).json({ success: true, reserves });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error on Get table reservations', error });
    }
}

const acceptTableReservation = async(req,res) =>{
    try {
        const tableReservationId = req.params.id;

        const acceptTable = TableReserve.findByIdAndUpdate(tableReservationId,{
            status: "Approved"
        },
    {
        new: true
    })

    if (!acceptTable) {
        return res.status(404).json({success:false, message: "Table reservation not found"})
        }

        res.status(200).json({success:true, message: "Table reservation accepted" })
    } catch (error) {
        res.status(400).json({success:false,message:"error",error})
    }
}

const rejectTableReservation = async(req,res)=>{
    try {
        const tableReservationId = req.params.id;

        const rejectTable = TableReserve.findByIdAndUpdate(tableReservationId,{
            status: "Declined"
        },{
            new: true
        })

        if(!rejectTable){
            return res.status(404).json({success:false, message: "Table reservation not found"})
        }

        res.status(200).json({success:true, message: "Table reservation rejected" })
    } catch (error) {
        res.status(400).json({success:false,message:"error",error})
    }
}






module.exports = {
    addTableReserve,
    getTableReserves,
    acceptTableReservation,
    rejectTableReservation
}