import React, { useEffect, useState } from 'react';
import "../css/menu.css";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Modal, Box, TextField, Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const RoomList = ({ roomData, setRoomData, handleEdit }) => {
  const [search, setSearch] = useState('');

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // Delete room
  const handleDelete = async (id) => {
    const itemdel = roomData.find(room => room._id === id)
    
    //eslint-disable-next-line no-restricted-globals
    const userConfirmed = confirm("Are you sure you want to delete this room?");
    if (userConfirmed) {
      const deleteR = await fetch(`${process.env.REACT_APP_API_URL}/delete-room/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          image1: itemdel.room_image1.public_id,
          image2: itemdel.room_image2.public_id,
          image3: itemdel.room_image3.public_id,
          image4: itemdel.room_image4.public_id
         }),
      });
      const data = await deleteR.json();
      if (data.success) {
        window.location.reload();
        
      }else{
        console.log(data.message);
      }
    }
  };

  const filteredRooms = roomData.filter(item =>
    item.room_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className='menu-table'>
        <div className="menu-search">
          <input type="text" value={search} onChange={handleSearchChange} className='menu-search' placeholder='Search' />
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead className='table-head'>
              <TableRow>
                <TableCell style={{ fontSize: "1.2rem", letterSpacing: "1px", fontWeight: "500" }}>SN</TableCell>
                <TableCell style={{ fontSize: "1.2rem", letterSpacing: "1px", fontWeight: "500" }}>Image</TableCell>
                <TableCell style={{ fontSize: "1.2rem", letterSpacing: "1px", fontWeight: "500" }}>Name</TableCell>
                <TableCell style={{ fontSize: "1.2rem", letterSpacing: "1px", fontWeight: "500" }}>Category</TableCell>
                <TableCell style={{ fontSize: "1.2rem", letterSpacing: "1px", fontWeight: "500" }}>Price</TableCell>
                <TableCell style={{ fontSize: "1.2rem", letterSpacing: "1px", fontWeight: "500" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRooms.map((item, index) => (
                <TableRow key={item.room_name} className='table-row'>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className='table-row'>
                    {item.room_image1 ? <img src={item.room_image1.url} alt={item.room_name} className="menu-img" /> : 'No Image'}
                  </TableCell>
                  <TableCell className='table-row'>{item.room_name}</TableCell>
                  <TableCell className='table-row'>{item.room_category}</TableCell>
                  <TableCell className='table-row'>Rs. {item.room_price}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(item._id)}>
                      <Edit className='menu-edit' />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(item._id)}>
                      <Delete className='menu-delete' />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

const Rooms = () => {
  const [roomData, setRoomData] = useState([]);
  const [open, setOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({ title: '', category: '', price: '', img: null, miniImg1: null, miniImg2: null, miniImg3: null });
  const [errors, setErrors] = useState({ title: false, category: false, price: false, img: false, miniImg1: false, miniImg2: false, miniImg3: false });
  const [imagePreview, setImagePreview] = useState(null);
  const [miniImagePreview, setMiniImagePreview] = useState({ miniImg1: null, miniImg2: null, miniImg3: null });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editRoomData, setEditRoomData] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  const getAllRooms = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/get-rooms`);
      const data = await response.json();
      setRoomData(data.rooms || []);
      console.log(data.rooms);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  useEffect(() => {
    getAllRooms();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditModalOpen(false);
    setEditRoomData(null);
    setEditingIndex(null);
    setImagePreview(null);
    setEditImagePreview(null);
    setMiniImagePreview({ miniImg1: null, miniImg2: null, miniImg3: null });
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (editModalOpen) {
      if (name === 'img') {
        setEditRoomData({ ...editRoomData, room_image1: files[0] });
        setEditImagePreview(URL.createObjectURL(files[0]));
      } else if (name === 'miniImg1') {
        setEditRoomData({ ...editRoomData, room_image2: files[0] });
        setMiniImagePreview({ ...miniImagePreview, miniImg1: URL.createObjectURL(files[0]) });
      } else if (name === 'miniImg2') {
        setEditRoomData({ ...editRoomData, room_image3: files[0] });
        setMiniImagePreview({ ...miniImagePreview, miniImg2: URL.createObjectURL(files[0]) });
      } else if (name === 'miniImg3') {
        setEditRoomData({ ...editRoomData, room_image4: files[0] });
        setMiniImagePreview({ ...miniImagePreview, miniImg3: URL.createObjectURL(files[0]) });
      } else {
        setEditRoomData({ ...editRoomData, [name]: value });
      }
    } else {
      if (name === 'img') {
        setNewRoom({ ...newRoom, img: files[0] });
        setImagePreview(URL.createObjectURL(files[0]));
        setErrors({ ...errors, img: false });
      } else if (name === 'miniImg1') {
        setNewRoom({ ...newRoom, miniImg1: files[0] });
        setMiniImagePreview({ ...miniImagePreview, miniImg1: URL.createObjectURL(files[0]) });
        setErrors({ ...errors, miniImg1: false });
      } else if (name === 'miniImg2') {
        setNewRoom({ ...newRoom, miniImg2: files[0] });
        setMiniImagePreview({ ...miniImagePreview, miniImg2: URL.createObjectURL(files[0]) });
        setErrors({ ...errors, miniImg2: false });
      } else if (name === 'miniImg3') {
        setNewRoom({ ...newRoom, miniImg3: files[0] });
        setMiniImagePreview({ ...miniImagePreview, miniImg3: URL.createObjectURL(files[0]) });
        setErrors({ ...errors, miniImg3: false });
      } else {
        setNewRoom({ ...newRoom, [name]: value });
        setErrors({ ...errors, [name]: false });
      }
    }
  };

  // Add new room
  const handleSubmit = async () => {
    const newErrors = {
      title: newRoom.title.trim() === '',
      category: newRoom.category.trim() === '',
      price: newRoom.price.trim() === '',
      img: newRoom.img === null,
      miniImg1: newRoom.miniImg1 === null,
      miniImg2: newRoom.miniImg2 === null,
      miniImg3: newRoom.miniImg3 === null,
    };

    if (Object.values(newErrors).some(error => error)) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append('room_name', newRoom.title);
    formData.append('room_category', newRoom.category);
    formData.append('room_price', newRoom.price);
    formData.append('img1', newRoom.img);
    formData.append('img2', newRoom.miniImg1);
    formData.append('img3', newRoom.miniImg2);
    formData.append('img4', newRoom.miniImg3);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/add-room`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        console.log(data.message);
        getAllRooms();
      } else {
        console.error('Error adding room:', data.error);
      }
    } catch (error) {
      console.error('Error adding room:', error);
    }

    setNewRoom({ title: '', category: '', price: '', img: null, miniImg1: null, miniImg2: null, miniImg3: null });
    setImagePreview(null);
    setMiniImagePreview({ miniImg1: null, miniImg2: null, miniImg3: null });
    handleClose();
  };

  const handleEdit = (id) => {
    const roomToEdit = roomData.find(item => item._id === id);
    const index = roomData.findIndex(item => item._id === id);
    setEditRoomData(roomToEdit);
    setEditImagePreview(roomToEdit.room_image1 || null);
    setMiniImagePreview({
      miniImg1: roomToEdit.room_image2 || null,
      miniImg2: roomToEdit.room_image3 || null,
      miniImg3: roomToEdit.room_image4 || null
    });

    setEditingIndex(index + 1);
    setEditModalOpen(true);
  };

  const handleEditSubmit = async () => {

    console.log('img1', editRoomData.room_image1);
    console.log('img2', editRoomData.room_image2);
    console.log('img3', editRoomData.room_image3);
    console.log('img4', editRoomData.room_image4);

    const formData = new FormData();
    formData.append('room_name', editRoomData.room_name);
    formData.append('room_category', editRoomData.room_category);
    formData.append('room_price', editRoomData.room_price);
    formData.append('img1', editRoomData.room_image1);
    formData.append('img2', editRoomData.room_image2);
    formData.append('img3', editRoomData.room_image3);
    formData.append('img4', editRoomData.room_image4);
    formData.append('oldImgId1', editRoomData.room_image1.public_id);
    formData.append('oldImgId2', editRoomData.room_image2.public_id);
    formData.append('oldImgId3', editRoomData.room_image3.public_id);
    formData.append('oldImgId4', editRoomData.room_image4.public_id);

    console.log('Edited Data:', {
      id: editRoomData._id,
      room_name: editRoomData.room_name,
      room_category: editRoomData.room_category,
      room_price: editRoomData.room_price,
      img1: editRoomData.room_image1,
      img2: editRoomData.room_image2,
      img3: editRoomData.room_image3,
      img4: editRoomData.room_image4
    });

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/update-room/${editRoomData._id}`, {
        method: 'PATCH',
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        console.log(data.message);
        getAllRooms();
        handleClose();
      } else {
        console.error('Error updating room:', data.error);
      }
    } catch (error) {
      console.error('Error updating room:', error);
    }

   
  };

  return (
    <>
      <div className="menu-content">
        <button onClick={handleOpen} className='add-item'>Add Room</button>
        <RoomList roomData={roomData} setRoomData={setRoomData} handleEdit={handleEdit} />
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box className="modal-box" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
          <h2 style={{ textAlign: "center" }}>Add New Room</h2>
          <form>
            <TextField
              label="Name"
              name="title"
              value={newRoom.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={errors.title}
              helperText={errors.title ? "Name is required" : ""}
            />
            <TextField
              label="Category"
              name="category"
              value={newRoom.category}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={errors.category}
              helperText={errors.category ? "Category is required" : ""}
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={newRoom.price}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={errors.price}
              helperText={errors.price ? "Price is required" : ""}
            />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              name="img"
              onChange={handleChange}
            />
            <label htmlFor="raised-button-file">
              <Button variant="contained" component="span" className='upload-img' style={{ backgroundColor: "rgb(50, 213, 213)" }}>
                Upload Main Image
              </Button>
            </label>
            {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
            {errors.img && <p style={{ color: 'red' }}>Main image is required</p>}

            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="miniImg1"
              type="file"
              name="miniImg1"
              onChange={handleChange}
            />
            <label htmlFor="miniImg1">
              <Button variant="contained" component="span" className='upload-img' style={{ backgroundColor: "rgb(50, 213, 213)" }}>
                Upload Mini Image 1
              </Button>
            </label>
            {miniImagePreview.miniImg1 && <img src={miniImagePreview.miniImg1} alt="Preview" className="image-preview" />}
            {errors.miniImg1 && <p style={{ color: 'red' }}>Mini image 1 is required</p>}

            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="miniImg2"
              type="file"
              name="miniImg2"
              onChange={handleChange}
            />
            <label htmlFor="miniImg2">
              <Button variant="contained" component="span" className='upload-img' style={{ backgroundColor: "rgb(50, 213, 213)" }}>
                Upload Mini Image 2
              </Button>
            </label>
            {miniImagePreview.miniImg2 && <img src={miniImagePreview.miniImg2} alt="Preview" className="image-preview" />}
            {errors.miniImg2 && <p style={{ color: 'red' }}>Mini image 2 is required</p>}

            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="miniImg3"
              type="file"
              name="miniImg3"
              onChange={handleChange}
            />
            <label htmlFor="miniImg3">
              <Button variant="contained" component="span" className='upload-img' style={{ backgroundColor: "rgb(50, 213, 213)" }}>
                Upload Mini Image 3
              </Button>
            </label>
            {miniImagePreview.miniImg3 && <img src={miniImagePreview.miniImg3} alt="Preview" className="image-preview" />}
            {errors.miniImg3 && <p style={{ color: 'red' }}>Mini image 3 is required</p>}

            <Box display="flex" justifyContent="space-between" marginTop="16px">
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Add
              </Button>
              <Button variant="contained" color="secondary" onClick={handleClose} style={{ backgroundColor: 'red' }}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
      <Modal open={editModalOpen} onClose={handleClose}>
        <Box className="modal-box" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
          <h2 style={{ textAlign: "center" }}>Editing Room {editingIndex}</h2>
          <form>
            <TextField
              label="Name"
              name="room_name"
              value={editRoomData?.room_name || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Category"
              name="room_category"
              value={editRoomData?.room_category || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Price"
              name="room_price"
              type="number"
              value={editRoomData?.room_price || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file-edit"
              type="file"
              name="img"
              onChange={handleChange}
            />
            <label htmlFor="raised-button-file-edit">
              <Button variant="contained" component="span" className='upload-img'>
                Upload Main Image
              </Button>
            </label>
            {editImagePreview && <img src={editImagePreview.url || editImagePreview} alt="Preview" className="image-preview" />}

            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="miniImg1-edit"
              type="file"
              name="miniImg1"
              onChange={handleChange}
            />
            <label htmlFor="miniImg1-edit">
              <Button variant="contained" component="span" className='upload-img'>
                Upload Mini Image 1
              </Button>
            </label>
            {miniImagePreview.miniImg1 && <img src={miniImagePreview.miniImg1.url || miniImagePreview.miniImg1} alt="Preview" className="image-preview" />}

            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="miniImg2-edit"
              type="file"
              name="miniImg2"
              onChange={handleChange}
            />
            <label htmlFor="miniImg2-edit">
              <Button variant="contained" component="span" className='upload-img'>
                Upload Mini Image 2
              </Button>
            </label>
            {miniImagePreview.miniImg2 && <img src={miniImagePreview.miniImg2.url || miniImagePreview.miniImg2} alt="Preview" className="image-preview" />}

            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="miniImg3-edit"
              type="file"
              name="miniImg3"
              onChange={handleChange}
            />
            <label htmlFor="miniImg3-edit">
              <Button variant="contained" component="span" className='upload-img'>
                Upload Mini Image 3
              </Button>
            </label>
            {miniImagePreview.miniImg3 && <img src={miniImagePreview.miniImg3.url || miniImagePreview.miniImg3} alt="Preview" className="image-preview" />}

            <Box display="flex" justifyContent="space-between" marginTop="16px">
              <Button variant="contained" color="primary" onClick={handleEditSubmit}>
                Update
              </Button>
              <Button variant="contained" color="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default Rooms;
