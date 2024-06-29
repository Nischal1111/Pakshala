import React, { useEffect, useState } from 'react';
import "../css/menu.css";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Modal, Box, TextField, Button } from '@mui/material';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {userLogged} from "../components/Cookie"
import {notify} from "../components/Notify"
import { ToastContainer } from 'react-toastify';
import { ImSpinner2 } from 'react-icons/im';
import { delnotify } from '../components/delnotify';
import { editnotify } from '../components/editnotify';

const RoomList = ({ roomData, handleEdit,getAllRooms }) => {
  const [search, setSearch] = useState('');
  const [delloading, setdelLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = (id) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // Delete room
  const handleDelete = async (id) => {
    setdelLoading(true)
    const itemdel = roomData.find(room => room._id === id)
    
      const deleteR = await fetch(`${process.env.REACT_APP_API_URL}/delete-room/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ 
          image1: itemdel.room_image1.public_id,
          image2: itemdel.room_image2.public_id,
          image3: itemdel.room_image3.public_id,
          image4: itemdel.room_image4.public_id
         }),
      });
      const data = await deleteR.json();
      if (data.success) {
        setdelLoading(false)
        delnotify()
        getAllRooms()
        handleClose()
        
      }else{
        setdelLoading(false)
        console.log(data.message);
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
                <TableCell style={{ fontSize: "1.2rem", letterSpacing: "1px", fontWeight: "500" }}>Guests</TableCell>
                <TableCell style={{ fontSize: "1.2rem", letterSpacing: "1px", fontWeight: "500" }}>Single Beds</TableCell>
                <TableCell style={{ fontSize: "1.2rem", letterSpacing: "1px", fontWeight: "500" }}>Double Beds</TableCell>
                <TableCell style={{ fontSize: "1.2rem", letterSpacing: "1px", fontWeight: "500" }}>Price</TableCell>
                <TableCell style={{ fontSize: "1.2rem", letterSpacing: "1px", fontWeight: "500" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRooms.map((item, index) => (
                <>
                <TableRow key={item.room_name} className='table-row'>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className='table-row'>
                    {item.room_image1 ? <img src={item.room_image1.url} alt={item.room_name} className="menu-img" /> : 'No Image'}
                  </TableCell>
                  <TableCell className='table-row'>{item.room_name}</TableCell>
                  <TableCell className='table-row'>{item.room_category}</TableCell>
                  <TableCell className='table-row'>{item.room_guests}</TableCell>
                  <TableCell className='table-row'>{item.room_single_beds}</TableCell>
                  <TableCell className='table-row'>{item.room_double_beds}</TableCell>
                  <TableCell className='table-row'>Rs. {item.room_price}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(item._id)}>
                      <Edit className='menu-edit' />
                    </IconButton>
                    <IconButton onClick={handleOpen}>
                      <Delete className='menu-delete' />
                    </IconButton>
                  </TableCell>
                </TableRow>
                 <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Delete Image</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this room?
          </DialogContentText>
        </DialogContent>
        
          {delloading ? (<>
          <div className='loading-spinner' style={{height:"2rem",width:"2rem",margin:"1rem 0rem 2rem 2rem"}}>
            <ImSpinner2 className='loading' style={{height:"2rem",width:"2rem"}}/>
          </div>
          </>):(<>
          <DialogActions>
          <Button onClick={handleClose} color="primary" sx={{ color: "#06D001" }}>
            Cancel
          </Button>
          <Button onClick={()=>handleDelete(item._id)} color="primary" autoFocus sx={{ color: "red" }}>
            Delete
          </Button>
          </DialogActions>
          </>)}
      </Dialog>
                </>
                
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

const Rooms = () => {

    const navigate = useNavigate();

  useEffect(() => {
    if (!userLogged()) {
      navigate('/login');
    }
  }, [navigate]);

  const [roomData, setRoomData] = useState([]);
  const [open, setOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({ title: '', category: '', price: '',guests:"", single_beds: 0, double_beds: 0, img: null, miniImg1: null, miniImg2: null, miniImg3: null });
  const [errors, setErrors] = useState({ title: false, category: false, price: false,guests:false, single_beds: false, double_beds: false, img: false, miniImg1: false, miniImg2: false, miniImg3: false });
  const [imagePreview, setImagePreview] = useState(null);
  const [miniImagePreview, setMiniImagePreview] = useState({ miniImg1: null, miniImg2: null, miniImg3: null });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editRoomData, setEditRoomData] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [loading,setLoading]=useState(false)

  const getAllRooms = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/get-rooms`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      
      });
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
    } else if (name === 'room_name' || name === 'room_category' || name === 'room_price' || name === 'room_guests' || name === 'room_single_beds' || name === 'room_double_beds') {
      setEditRoomData({ ...editRoomData, [name]: name === 'room_price' || name === 'room_guests' || name === 'room_single_beds' || name === 'room_double_beds' ? parseInt(value, 10) : value });
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
    setLoading(true)
    const newErrors = {
      title: newRoom.title.trim() === '',
      category: newRoom.category.trim() === '',
      price: newRoom.price.trim() === '',
      guests: newRoom.guests.trim() === '',
      single_beds: newRoom.single_beds.trim() === '',
      double_beds: newRoom.double_beds.trim() === '',
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
    formData.append('room_guests', newRoom.guests);
    formData.append('single_beds', newRoom.single_beds);
    formData.append('double_beds', newRoom.double_beds);
    formData.append('img1', newRoom.img);
    formData.append('img2', newRoom.miniImg1);
    formData.append('img3', newRoom.miniImg2);
    formData.append('img4', newRoom.miniImg3);
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/add-room`, {
        method: 'POST',
        credentials: 'include',
        body: formData
      });
  
      const data = await response.json();
      if (data.success) {
        notify()
        setLoading(false)
        getAllRooms();
        setNewRoom({ title: '', category: '', price: '', guests: "", single_beds: 0, double_beds: 0, img: null, miniImg1: null, miniImg2: null, miniImg3: null });
        setImagePreview(null);
        setMiniImagePreview({ miniImg1: null, miniImg2: null, miniImg3: null });
        handleClose();
      } else {
        console.error('Error adding room:', data.error);
      }
    } catch (error) {
      console.error('Error adding room:', error);
    }
  };

  const handleEdit = (id) => {
    const roomToEdit = roomData.find((item) => item._id === id);
    const index = roomData.findIndex((item) => item._id === id);
    setEditRoomData(roomToEdit);
    setEditImagePreview(roomToEdit.room_image1 || null);
    setMiniImagePreview({
      miniImg1: roomToEdit.room_image2 || null,
      miniImg2: roomToEdit.room_image3 || null,
      miniImg3: roomToEdit.room_image4 || null,
    });

    setEditingIndex(index + 1);
    setEditModalOpen(true);
  };

  const handleEditSubmit = async () => {
    const formData = new FormData();
    formData.append('room_name', editRoomData.room_name);
    formData.append('room_category', editRoomData.room_category);
    formData.append('room_price', editRoomData.room_price);
    formData.append('room_guests', editRoomData.room_guests);
    formData.append('room_single_beds', editRoomData.room_single_beds);
    formData.append('room_double_beds', editRoomData.room_double_beds);
    formData.append('img1', editRoomData.room_image1);
    formData.append('img2', editRoomData.room_image2);
    formData.append('img3', editRoomData.room_image3);
    formData.append('img4', editRoomData.room_image4);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/update-room/${editRoomData._id}`, {
        method: 'PATCH',
        credentials: 'include',
        body: formData,
      });

      const data = await response.json();
      if (data.success){
        editnotify();
        setLoading(false);
        getAllRooms();
        setEditModalOpen(false);
        setEditingIndex(null);
        setEditRoomData(null);
        setEditImagePreview(null);
        setMiniImagePreview({ miniImg1: null, miniImg2: null, miniImg3: null });
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
        <ToastContainer/>
        <button onClick={handleOpen} className='add-item'>Add Room</button>
        <RoomList roomData={roomData} setRoomData={setRoomData} handleEdit={handleEdit} getAllRooms={getAllRooms}/>
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
            <TextField
              label="Guests"
              name="guests"
              type="number"
              value={newRoom.guests}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={errors.guests}
              helperText={errors.guests ? "No. of guests is required" : ""}
            />
            <TextField
              label="Single Beds"
              name="single_beds"
              type="number"
              value={newRoom.single_beds}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={errors.single_beds}
              helperText={errors.single_beds ? "Single beds is required" : ""}
            />
            <TextField
              label="Double Beds"
              name="double_beds"
              type="number"
              value={newRoom.double_beds}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={errors.double_beds}
              helperText={errors.double_beds ? "Double beds is required" : ""}
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
            {loading ?(<div className='loading-spinner'>
                <ImSpinner2 className='loading' />
              </div>):(<Box display="flex" justifyContent="space-between" marginTop="16px">
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Add
              </Button>
              <Button variant="contained" color="secondary" onClick={handleClose} style={{ backgroundColor: 'red' }}>
                Cancel
              </Button>
            </Box>)}
            
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
            <TextField
              label="Guests"
              name="room_guests"
              type="number"
              value={editRoomData?.room_guests || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Single Beds"
              name="room_single_beds"
              type="number"
              value={editRoomData?.room_single_beds || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Double Beds"
              name="room_double_beds"
              type="number"
              value={editRoomData?.room_double_beds || ''}
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
