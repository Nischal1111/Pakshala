import React, { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import "../css/offers.css";

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

  const handleDeleteOffer = () => {
    setOfferImg(null);
  };

  return (
    <div className='offers-div'>
      <h1>Offers</h1>
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
    </div>
  );
};

export default Offers;
