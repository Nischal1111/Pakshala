const Room = require('../Schemas/Room');
const {uploadFile , deleteFile} = require('../../Middlewares/UploadFile');




//adding a new room
// room_name, room_price, room_image1, room_image2, room_image3, room_image4,  room_category

const addRoom = async (req, res) => {
    const { room_name, room_price, room_category } = req.body;

    // Validate required fields
    if (!room_name || !room_price || !room_category) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if files are provided
    if (!req.files) {
        return res.status(400).json({ message: 'Please upload room images.' });
    }
    // console.log(req.files);

    try {
        // Destructure and validate files
        const { img1, img2, img3, img4 } = req.files;

        if (!img1 || !img2 || !img3 || !img4) {
            return res.status(400).json({ message: 'Please upload all four room images.' });
        }

        
        const img1Path = img1[0].path;
        const img2Path = img2[0].path;
        const img3Path = img3[0].path;
        const img4Path = img4[0].path;

        // Upload images and gather URLs
        const imageUploads = [img1Path, img2Path, img3Path, img4Path].map(path => uploadFile(path, 'rooms'));
        const [uploadedImg1, uploadedImg2, uploadedImg3, uploadedImg4] = await Promise.all(imageUploads);

        // Create new room
        const room = new Room({
            room_name,
            room_price,
            room_image1: {
                url: uploadedImg1.secure_url,
                public_id: uploadedImg1.public_id
            },
            room_image2: {
                url: uploadedImg2.secure_url,
                public_id: uploadedImg2.public_id
            },
            room_image3: {
                url: uploadedImg3.secure_url,
                public_id: uploadedImg3.public_id
            },
            room_image4: {
                url: uploadedImg4.secure_url,
                public_id: uploadedImg4.public_id
            },
            room_category
        });

        // Save the room to the database
        await room.save();

        res.status(200).json({ success: true, message: 'Room added successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};


// for getting all the rooms

const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        if (!rooms) {
            return res.status(404).json({ message: 'No rooms found.' });
        }
        res.status(200).json({ success: true, rooms });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}




// for deleting a room
const deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const {image1, image2, image3, image4} = req.body;
        // console.log(image1, image2, image3, image4)

        if(!image1 || !image2 || !image3 || !image4) {
            return res.status(400).json({ message: 'Please provide all room images' });
        }

        // console.log(image1, image2, image3, image4)

        const room = await Room.findByIdAndDelete(id);
        
        const deleteUploads = [image1, image2, image3, image4].map(id => deleteFile(id));   
        const deleteImgs =  await Promise.all(deleteUploads);

        if(!deleteImgs) {
            return res.status(400).json({ message: 'Error deleting room images' });
        }
        
        if(!room) {
            return res.status(404).json({ message: 'Room item not found' });
        }
        res.status(200).json({success:true, message: 'Room item deleted successfully' });
    } catch (error) {
        res.status(500).json({success:false, message: 'Internal server error on Delete table Item' });
        // console.log(error)
    }
}



// editing the room data

const editRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const { room_name, room_price, room_category } = req.body;
        const { img1, img2, img3, img4 } = req.files;

        // console.log(img1, img2, img3, img4)

        // Check if all required fields and images are provided
        // if (!room_name || !room_price || !room_category || !oldImgId1 || !oldImgId2 || !oldImgId3 || !oldImgId4) {
        //     return res.status(400).json({ message: 'All fields are required.' });
        // }
        if (!img1 || !img2 || !img3 || !img4) {
            return res.status(400).json({ message: 'Please upload all four room images.' });
        }

        const img1Path = img1[0].path;
        const img2Path = img2[0].path;
        const img3Path = img3[0].path;
        const img4Path = img4[0].path;

       

        // Find the room by id
        const room = await Room.findById(id);
        if (!room) {
            return res.status(404).json({ message: 'Room item not found' });
        }

        
        const oldImgId1 = room.room_image1.public_id;
        const oldImgId2= room.room_image2.public_id;
        const oldImgId3 = room.room_image3.public_id;
        const oldImgId4 = room.room_image4.public_id;


         // Upload new images and gather URLs
         const imageUploads = [img1Path, img2Path, img3Path, img4Path].map(path => uploadFile(path, 'rooms'));
         const [uploadedImg1, uploadedImg2, uploadedImg3, uploadedImg4] = await Promise.all(imageUploads);
 
         // Delete old images
         const deleteUploads = [oldImgId1, oldImgId2, oldImgId3, oldImgId4].map(id => deleteFile(id));
         await Promise.all(deleteUploads);


        // Update the room data
        room.room_name = room_name;
        room.room_price = room_price;
        room.room_category = room_category;
        room.room_image1 = {
            url: uploadedImg1.secure_url,
            public_id: uploadedImg1.public_id
        };
        room.room_image2 = {
            url: uploadedImg2.secure_url,
            public_id: uploadedImg2.public_id
        };
        room.room_image3 = {
            url: uploadedImg3.secure_url,
            public_id: uploadedImg3.public_id
        };
        room.room_image4 = {
            url: uploadedImg4.secure_url,
            public_id: uploadedImg4.public_id
        };

        // Save the updated room data
        await room.save();

        res.status(200).json({ success: true, message: 'Room item edited successfully' });

    } catch (error) {
        console.error('Error editing room item:', error); // Log the error for debugging
        res.status(500).json({ success: false, message: 'Internal server error on Edit room Item' });
    }
};


        



module.exports = {
    addRoom,
    getRooms,
    deleteRoom,
    editRoom
}