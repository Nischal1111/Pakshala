import React, { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import "../css/offers.css";
import { useEffect } from 'react';

const Offers = () => {
  const [offerImg, setOfferImg] = useState(null);
  const [offerImagePath, setOfferImagePath] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setOfferImagePath(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setOfferImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('img', offerImagePath);
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/add-offer`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      
      const data = await response.json();
      if (data.success) {
        console.log(data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error('Error adding offer:', error);
    }
  };

  //get offer
  const getOffers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/get-offers`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        console.log(data.offers);
      }
    } catch (error) {
      console.error('Error getting offers:', error);
    }
  }

  //delete offer
  const deleteOffer = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/delete-offer/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        console.log(data.message);
      }
    } catch (error) {
      console.error('Error deleting offer:', error);
    }
  }

  const handleDeleteOffer = () => {
    setOfferImg(null);
    setOfferImagePath('');
  };

  useEffect(() => {
    getOffers();
  }, []);

  return (
    <div className='offers-div'>
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
