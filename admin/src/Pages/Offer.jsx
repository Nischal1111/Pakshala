import React, { useState } from 'react';
import { Button, Modal, Box, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import "../css/offers.css";

const Offers = () => {
  const [offer,setoffer] = useState([])
  const [open,setOpen]=useState(false)
  const [title,setTtile]=useState("")
  const [perc,setPerc]=useState("")
  const [img,setImg]=useState(null)

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOffer=()=>{
    const newOffer={
      title:title,
      perc:perc,
      img:img
    }
    setoffer(newOffer)
    setTtile("")
    setImg(null)
    handleClose()
    setPerc("")
  }

  const handleDeleteOffer = () => {
    setoffer(null);
  };

  return (
    <div className='offers-div'>
      <h1>Offers</h1>
      <Button variant="contained" onClick={handleOpen}>
        Add Offer
      </Button>
      <div className='offers-list'>
        {offer &&
          <div className='offer-item'>
            <div className='offer-details'>
              <h2>{offer.title}</h2>
              <p>{offer.perc}% off</p>
              {offer.img && <img src={offer.img} alt="offer" className="offer-image" />}
            </div>
            <IconButton onClick={() => handleDeleteOffer()} aria-label="delete" className="delete-button">
              <DeleteIcon />
            </IconButton>
          </div>
        }
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box className='modal-box'>
          <h2>Add New Offer</h2>
          <TextField
            label="Offer Title"
            fullWidth
            value={title}
            onChange={(e) => setTtile(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Offer Percentage"
            fullWidth
            value={perc}
            onChange={(e) => setPerc(e.target.value)}
            margin="normal"
            type="number"
          />
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="offer-image-file"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="offer-image-file">
            <Button variant="contained" component="span">
              Upload Offer Image
            </Button>
          </label>
          <Button variant="contained" onClick={handleOffer} style={{ marginTop: '1rem' }}>
            Add Offer
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Offers;
