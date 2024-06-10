
const Menu = require('../Schemas/Menu');
const uploadFile = require('../../Middlewares/UploadFile');

//  Adding a new menu item 

const addMenuItem = async (req, res) => {
    try {
        const { item_name, item_price, item_category } = req.body;
        const file = req.file.path;

        const uploadResult = await uploadFile(file);

        const newMenuItem = new Menu({
            item_name,
            item_price,
            item_image: uploadResult.secure_url,
            item_category
        });

        await newMenuItem.save();
        res.status(201).json({success:true, message: 'Menu item added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}






module.exports = { 
    addMenuItem 
};