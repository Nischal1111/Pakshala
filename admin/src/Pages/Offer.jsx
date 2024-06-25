import React, { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import "../css/offers.css";
import {notify} from "../components/Notify"
import { ToastContainer } from 'react-toastify';

const Offers = () => {
  const [offerImg, setOfferImg] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOfferImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit=(e)=>{
    e.preventDefault()
    notify()
    console.log(offerImg)
  }

  const handleDeleteOffer = () => {
    setOfferImg(null);
  };

  return (
    <div className='offers-div'>
      <ToastContainer/>
      <h1>Offers</h1>
      <form onSubmit={handleSubmit}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="offer-image-file"
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="offer-image-file">
          <Button variant="contained" component="span" style={{border:"none",backgroundColor:"transparent",color:"blue",boxShadow:"none",textDecoration:"underline"}}>
            Upload Offer Image
          </Button>
        </label>
        <div className='offers-list'>
          {offerImg &&
            <div className='offer-item'>
              <img src={offerImg} alt="offer" className="offer-image" />
              <IconButton onClick={handleDeleteOffer} aria-label="delete" className="delete-button">
                <DeleteIcon />
              </IconButton>
            </div>
          }
        </div>
        <Button type="submit" variant="contained" className='submit-button' style={{ marginLeft:".5rem",marginTop: "1rem", marginBottom: "1rem", backgroundColor: "#55AD9B" }}>
            Confirm Upload
        </Button>
      </form>
    </div>
  );
};

export default Offers;
