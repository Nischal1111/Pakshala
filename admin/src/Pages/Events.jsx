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
    const files = Array.from(event.target.files);
    setImages([...images, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append('images', image, `image-${index}`);
    });

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/add-event-images`, {
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
      console.error('Error uploading images:', error);
    }
  };


  // getting images from the server
  const getImages = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/get-event-images`, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      if (data.success) {
        console.log(data.message);
        
      }
    } catch (error) {
      console.error('Error getting images:', error);
    }
  };

  useEffect(() => {
    getImages();
  } ,[]);

  return (
    <div className='events-div'>
      <h1>Events Gallery</h1>
      <form onSubmit={handleSubmit}>
        <div className='images-div'>
          {images.map((image, index) => (
            <div key={index} className="image-container">
              <img src={URL.createObjectURL(image)} alt={`Uploaded ${index}`} className="uploaded-image" />
            </div>
          ))}
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="item-image-file"
            type="file"
            multiple
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
      </form>
    </div>
  );
};

export default Events;
