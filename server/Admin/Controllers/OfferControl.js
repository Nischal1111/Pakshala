const Offer = require('../Schemas/Offer');

const {uploadFile, deleteFile} = require('../../Utils/UploadFile');


// Add a new offer
const addOffer = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Please upload an image' });
      }
      const imagePath = req.file.path;
      const uploadResult = await uploadFile(imagePath, "offers");
  
      const newOffer = new Offer({
        offer_image_url: uploadResult.secure_url,
        offer_image_Id: uploadResult.public_id
      });
  
      await newOffer.save();
  
      res.status(201).json({ success: true, message: 'Offer added successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error on Add offer' });
      console.log(error);
    }
  };

// Get all the offers

const getOffers = async (req, res) => {
    try {
        const offers = await Offer.find();
        if (!offers) {
            return res.status(404).json({ message: 'No offers found' });
        }
        res.status(200).json({ success: true, offers });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error on Get offers' });
        // console.log(error)
    }
}

// Delete an offer
const deleteOffer = async (req, res) => {
    try {
        const { id } = req.params;
        const { imageId } = req.body;

        if (!imageId) {
            return res.status(400).json({ message: 'Please provide the offer image' });
        }

        const offer = await Offer.findByIdAndDelete(id);

        if (!offer) {
            return res.status(404).json({ message: 'No offer found' });
        }

        const deleteUpload = deleteFile(imageId);

        if(!deleteUpload) {
            return res.status(500).json({ message: 'Internal server error on delete offer image' });
        }

        res.status(200).json({ success: true, message: 'Offer deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error on Delete offer' });
        // console.log(error)
    }
}


module.exports = { 
    addOffer, 
    getOffers, 
    deleteOffer 
};