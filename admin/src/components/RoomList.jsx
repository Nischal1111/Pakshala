import React, { useState } from 'react';
import "../css/menu.css";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { Edit, Delete,Close,Check } from '@mui/icons-material';
import { ImSpinner2 } from 'react-icons/im';
import { delnotify } from '../components/delnotify';

const RoomList = ({ roomData, handleEdit,getAllRooms }) => {
  const [delloading, setdelLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = (id) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

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

  const handleCancelBooking=async(id)=>{
    const roomToCancel=roomData.find(item => item._id === id)
      console.log(roomToCancel._id)
  }
  const handleBooking=async(id)=>{
    const roomToBook=roomData.find(item => item._id === id)
      console.log(roomToBook._id)
  }

  return (
    <>
      <div className='menu-table'>
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
              {roomData?.map((item, index) => (
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
                     <IconButton >
                        {item.isBooked ?<Close className='menu-delete' onClick={()=>{handleBooking(item._id)}}/>: <Check className='menu-edit' onClick={()=>{handleCancelBooking(item._id)}} />}
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

export default RoomList;
