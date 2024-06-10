
const Menu = require('../Schemas/Menu');
const uploadFile = require('../../Middlewares/UploadFile');

//  Adding a new menu item 

const addMenuItem = async (req, res) => {
    try {
        const { title, price, category } = req.body;
        // console.log(title, price, category);
        // console.log(req.file);

        if(!req.file) {
            return res.status(400).json({ message: 'Please upload an image' });
        }
        const imagePath = req.file.path;
        // console.log(imagePath);  
       

        const uploadResult = await uploadFile(imagePath);

        const newMenuItem =new Menu({
            item_name: title,
            item_price: price,
            item_image: uploadResult.secure_url,
            item_category: category
        });

        await newMenuItem.save();
        res.status(201).json({success:true, message: 'Menu item added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error on Add menu Item' });
        console.log(error)
    }
}






module.exports = { 
    addMenuItem 
};