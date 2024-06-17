import React, { useState,useEffect } from 'react';
import "../css/menu.css";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Button, Modal, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {userLogged} from "../components/Cookie"


const Special = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemImage, setItemImage] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setItemImage(URL.createObjectURL(file));
    }
  };

  const handleAddItem = () => {
    if (itemName && itemImage) {
      setItems([...items, { name: itemName, image: itemImage }]);
      setItemName('');
      setItemImage(null);
      handleClose();
    } else {
      alert("Please provide both an item name and image.");
    }
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  return (
    <section>
      <div className='special-div'>
        <h1>Today's Special</h1>
        <div style={{ display: "flex" }}>
          {items.map((item, index) => (
            <div className='special-card' key={index}>
              <img src={item.image} alt={item.name} style={{ width: "100%", height: "60%",objectFit:"cover" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",marginTop:".5rem" }}>
                <p style={{fontSize:"1.2rem",letterSpacing:"3px",marginRight:"2rem"}}>{item.name}</p>
                <FaTrash
                  style={{ cursor: "pointer", color: "red" ,marginLeft:"2rem"}}
                  onClick={() => handleRemoveItem(index)}
                />
              </div>
            </div>
          ))}
          <div className='special-card' onClick={handleOpen}>
            <FaPlus style={{ fontSize: "2.5rem", color: "#B4B4B8" }} />
          </div>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className='modal-box'>
          <h2>Add Special Item</h2>
          <TextField
            label="Item Name"
            variant="outlined"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            fullWidth
            style={{ marginBottom: '10px' }}
          />
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="item-image-file"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="item-image-file">
            <Button variant="contained" component="span">
              Upload Item Image
            </Button>
          </label>
          {itemImage && (
            <div>
              <img src={itemImage} alt="Preview" style={{ width: '100%', height: 'auto', marginTop: '10px' }} />
            </div>
          )}
          <Button variant="contained" color="primary" onClick={handleAddItem} style={{ marginTop: '10px' }}>
            Add Item
          </Button>
        </div>
      </Modal>
    </section>
  );
};

const Menu = () => {
    const navigate = useNavigate();

  useEffect(() => {
    if (!userLogged()) {
      navigate('/login');
    }
  }, [navigate]);

  const [file, setFile] = useState(null);
  const [drinkfile, setDrinkFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(URL.createObjectURL(selectedFile));
      
    } else {
      alert("Please upload a valid PDF file.");
    }
    
  };

  const handleDrink=(event)=>{
    const selectedFile2 = event.target.files[0];
    if (selectedFile2 && selectedFile2.type === "application/pdf") {
      setDrinkFile(URL.createObjectURL(selectedFile2));
      
    } else {
      alert("Please upload a valid PDF file.");
    }
  }

  return (
    <>
      <div className="menu-content">
        <Special />
        <div className='menu-file'>
          <input
            accept="application/pdf"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            name="MenuPDF"
            onChange={handleFileChange}
          />
          <label htmlFor="raised-button-file">
            <Button variant="contained" component="span" className='upload-img2' style={{marginLeft:"2rem",marginTop:"1rem",marginBottom:"1rem"}}>
              Upload Menu File
            </Button>
          </label>
          {file && (
            <div className='pdf-viewer'>
              <iframe
                src={file}
                width="100%"
                height="600px"
                style={{ border: "none", marginTop: "20px" }}
                title="Menu PDF"
              ></iframe>
            </div>
          )}
          <input
            accept="application/pdf"
            style={{ display: 'none' }}
            id="raised-drink-file"
            type="file"
            name="DrinkPDF"
            onChange={handleDrink}
          />
          <label htmlFor="raised-drink-file">
            <Button variant="contained" component="span" className='upload-img2'style={{marginLeft:"2rem",marginTop:"1rem",marginBottom:"1rem"}}>
              Upload Drinks File
            </Button>
          </label>
          {drinkfile && (
            <div className='pdf-viewer'>
              <iframe
                src={drinkfile}
                width="100%"
                height="600px"
                style={{ border: "none", marginTop: "20px" }}
                title="DrinkPDF"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Menu;
