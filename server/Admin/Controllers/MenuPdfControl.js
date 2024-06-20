const MenuPdf = require('../Schemas/MenuPdf');

const {uploadFile , deleteFile} = require('../../Middlewares/UploadFile');


// add file
const addMenuPdf = async (req, res) => {
    // Validate required fields
    if (!req.file) {
        return res.status(400).json({success:false, message: 'Please upload menu pdf.' });
    }

    try {

        const {menu_type} = req.body;
        
        const filePath = file.path;

        if (!filePath) {
            return res.status(400).json({success:false, message: 'Please upload menu pdf.' });
        }// Destructure and validate files
        const { file } = req;

        if (!file) {
            return res.status(400).json({success:false, message: 'Please upload menu pdf.' });
        }


        // Upload file and gather URL
        const uploadedFile = await uploadFile(filePath, 'menu_pdf');

        // Create new menu pdf
        const menuPdf = new MenuPdf({
            menu_url: uploadedFile.secure_url,
            menu_public_id: uploadedFile.public_id,
            menu_type
        });

        if(!menuPdf){
            return res.status(400).json({success:false, message: 'Error in saving menu pdf.' });
        }

        res.status(201).json({success:true, message: 'Menu pdf added successfully.' });
    } catch (error) {
        res.status(500).json({success:false, message: 'Internal server error.' });
    }
}


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