import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userLogged } from "../components/Cookie";
import "../css/events.css";
import { Button } from "@mui/material";

const Events = () => {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLogged()) {
      navigate('/login');
    }
  }, [navigate]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages([...images, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='events-div'>
      <h1>Events Gallery</h1>
      <div className='images-div'>
        {images.map((image, index) => (
          <div key={index} className="image-container">
            <img src={image} alt={`Uploaded ${index}`} className="uploaded-image" />
          </div>
        ))}
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="item-image-file"
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="item-image-file">
          <Button variant="contained" component="span" style={{ border:"none",backgroundColor:"transparent",color:"blue",boxShadow:"none" }}>
            Upload Event Image
          </Button>
        </label>
      </div>
      <Button type="submit" variant="contained" className='submit-button' style={{ marginLeft:".5rem",marginTop: "1rem", marginBottom: "1rem", backgroundColor: "#55AD9B" }}>
          Confirm Upload
      </Button>
    </div>
  );
};

export default Events;
