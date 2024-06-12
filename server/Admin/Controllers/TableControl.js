
const Table = require('../Schemas/Table');
const uploadFile = require('../../Middlewares/UploadFile');

//  Adding a new table item 

const addTableItem = async (req, res) => {
    try {
        const { name, category, guest } = req.body;
        // console.log(title, price, category);
        // console.log(req.file);

        if(!req.file) {
            return res.status(400).json({ message: 'Please upload an image' });
        }
        const imagePath = req.file.path;
        // console.log(imagePath);  
       

        const uploadResult = await uploadFile(imagePath,"tables");

        const newMenuItem =new Table({
            table_name: name,
            table_guests: guest,
            table_image: uploadResult.secure_url,
            table_category: category
        });

        await newMenuItem.save();
        
        res.status(201).json({success:true, message: 'table item added successfully' });
    } catch (error) {
        res.status(500).json({success:false, message: 'Internal server error on Add table Item' });
        // console.log(error)
    }
}


// display all the table items

const getTableItems = async (req, res) => {
    try {
        const tableItems = await Table.find();
        if(!tableItems) {
            return res.status(404).json({ message: 'No table items found' });
        }
        res.status(200).json({success:true, tableItems});
    } catch (error) {
        res.status(500).json({success:false, message: 'Internal server error on Get table Items' });
        console.log(error)
    }
}



// deleting table items

const deleteTableItem = async (req, res) => {
    try {
        const { id } = req.params;
        const tableItem = await Table.findByIdAndDelete(id);
        if(!tableItem) {
            return res.status(404).json({ message: 'table item not found' });
        }
        res.status(200).json({success:true, message: 'table item deleted successfully' });
    } catch (error) {
        res.status(500).json({success:false, message: 'Internal server error on Delete table Item' });
        // console.log(error)
    }
}




module.exports = { 
    addTableItem,
    getTableItems,
    deleteTableItem
};