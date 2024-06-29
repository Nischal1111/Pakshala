const MenuOrder = require('../Schemas/MenuOrder');
const {sendMenuOrderMail} = require('../../Utils/MailSend')



// requesting new menu order

const createMenuRequest = async (req, res) => {

    try {
        const { fullName, contact, order } = req.body;

        if (!fullName || !contact || !order) {
            return res.status(400).json({success:false, message: "All fields are required" });
        }

        const newMenuOrder = new MenuOrder({
            fullName,
            contact,
            order
        });
        const savedMenuOrder = await newMenuOrder.save();
        if (!savedMenuOrder) {
            return res.status(500).json({success:false, message: "Menu order request failed" });
        }
        //sending mail
        await sendMenuOrderMail({orderDetails: savedMenuOrder})

        res.status(200).json({success:true, order:savedMenuOrder ,message: "Menu order request sent successfully" });
    } catch (err) {
        res.status(500).json({success:false, error: err.message, message: "Menu order request failed" });
    }
}

// displaying all menu orders
const getAllMenuOrders = async (req, res) => {
    try {
        const allMenuOrders = await MenuOrder.find();
        if (!allMenuOrders) {
            return res.status(404).json({success:false, message: "Menu orders not found" });
        }
        res.status(200).json({success:true, orders: allMenuOrders });
    } catch (err) {
        res.status(500).json({success:false, error: err.message, message: "Menu orders not found" });
    }
}




module.exports = {
    createMenuRequest,
    getAllMenuOrders
}


