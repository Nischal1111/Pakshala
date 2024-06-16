const SpecialMenu = require('../Schemas/SpecialMenu');

const {uploadFile , deleteFile} = require('../../Middlewares/UploadFile');



//adding a new special menu item

const addSpecialMenuItem = async (req, res) => {
    const { item_name } = req.body;

    // Validate required fields
    if (!item_name) {
        return res.status(400).json({success:false, message: 'All fields are required.' });
    }

    // Check if files are provided
    if (!req.files) {
        return res.status(400).json({success:false, message: 'Please upload special menu item image.' });
    }
    // console.log(req.files);

    try {
        // Destructure and validate files
        const { img } = req.files;

        if (!img) {
            return res.status(400).json({success:false, message: 'Please upload special menu item image.' });
        }

        
        const imgPath = img[0].path;

        // Upload image and gather URL
        const uploadedImg = await uploadFile(imgPath, 'special_menu');

        // Create new special menu item
        const specialMenuItem = new SpecialMenu({
            item_name,
            item_image: {
                url: uploadedImg.secure_url,
                public_id: uploadedImg.public_id
            }
        });

        // Save special menu item to database
        await specialMenuItem.save();

        if(!specialMenuItem){
            return res.status(400).json({success:false, message: 'Error in saving special menu item.' });
        }

        res.status(201).json({success:true, message: 'Special menu item added successfully.' });
    } catch (error) {
        res.status(500).json({success:false, message: 'Internal server error.' });
    }
}





//deleting a special menu item
const deleteSpecialMenuItem = async (req, res) => {
    const { id } = req.params;

    try {
        const specialMenuItem = await SpecialMenu.findById(id);

        if (!specialMenuItem) {
            return res.status(404).json({success:false, message: 'Special menu item not found.' });
        }

        const deleteImage =  await deleteFile(specialMenuItem.item_image.public_id);

        if(!deleteImage){
            return res.status(400).json({success:false, message: 'Error in deleting special menu item image.' });
        }

        const  removeItem = await specialMenuItem.remove();

        if(!removeItem){
            return res.status(400).json({success:false, message: 'Error in deleting special menu item.' });
        }

        res.status(200).json({success:true, message: 'Special menu item deleted successfully.' });
    } catch (error) {
        res.status(500).json({success:false, message: 'Internal server error.' });
    }
}



// getting all special menu items
const getSpecialMenuItems = async (req, res) => {
    try {
        const specialMenuItems = await SpecialMenu.find();

        if (!specialMenuItems) {
            return res.status(404).json({ message: 'No special menu items found.' });
        }

        res.status(200).json({success:true, specialMenuItems });
    } catch (error) {
        res.status(500).json({success:false, message: 'Internal server error.' });
    }
}




module.exports = {
    getSpecialMenuItems,
    addSpecialMenuItem,
    deleteSpecialMenuItem
}