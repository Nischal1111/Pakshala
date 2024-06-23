const MenuPdf = require('../Schemas/MenuPdf');

const {uploadFile, uploadFilePdf , deleteFile} = require('../../Middlewares/UploadFile');


// add file
const addMenuPdf = async (req, res) => {
    try {
        const menuFile = req.files['file'] ? req.files['file'][0] : null;
        const drinkFile = req.files['drink'] ? req.files['drink'][0] : null;

        if (!menuFile || !drinkFile) {
            return res.status(400).json({ success: false, message: 'Both menu and drink files are required.' });
        }

        // Process the uploaded files
        const menuFilePath = menuFile.path;
        const drinkFilePath = drinkFile.path;

        console.log('Menu file path:', menuFilePath);
        console.log('Drink file path:', drinkFilePath);

        // Upload files and gather URLs (assuming uploadFile is a function that handles the file upload)
        const uploadedMenuFile = await uploadFilePdf(menuFilePath, 'menus');
        const uploadedDrinkFile = await uploadFilePdf(drinkFilePath, 'menus');

        // Create new menu and drink records
        const menuPdf = new MenuPdf({
            menu_file: {
                menu_url: uploadedMenuFile.secure_url,
                menu_public_id: uploadedMenuFile.public_id
            },
            drink_file: {
                menu_url: uploadedDrinkFile.secure_url,
                menu_public_id: uploadedDrinkFile.public_id
            }
        });

        // Save the menu and drink records to the database
        await menuPdf.save();

        res.status(201).json({ success: true, message: 'Menu and drink PDFs added successfully.' });
    } catch (error) {
        console.error('Error adding menu PDF:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};



// get all menu pdfs

const getMenuPdfs = async (req, res) => {
    try {
        const menuPdfs = await MenuPdf.find();

        if(!menuPdfs){
            return res.status(404).json({success:false, message: 'Menu pdfs not found.' });
        }

        res.status(200).json({success:true, menuPdfs});
    } catch (error) {
        res.status(500).json({success:false, message: 'Internal server error.' });
    }
}

// delete menu pdf
const deleteMenuPdf = async (req, res) => {
    const { id } = req.params;

    try {
        const menuPdf = await MenuPdf.findById(id);

        if (!menuPdf) {
            return res.status(404).json({success:false, message: 'Menu pdf not found.' });
        }

        await deleteFile(menuPdf.menu_public_id);
        await deleteFile(menuPdf.drink_public_id);
        await menuPdf.remove();

        res.status(200).json({success:true, message: 'Menu pdf deleted successfully.' });
    } catch (error) {
        res.status(500).json({success:false, message: 'Internal server error.' });
    }
}



module.exports = {
    addMenuPdf,
    getMenuPdfs,
    deleteMenuPdf
}