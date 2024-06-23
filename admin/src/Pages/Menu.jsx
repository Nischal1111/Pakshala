import React, { useState, useEffect } from 'react';
import "../css/menu.css";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Button, Modal, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { userLogged } from "../components/Cookie"

const Special = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemImage, setItemImage] = useState(null);
  const [imagePath, setImagePath] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePath(file);
      setItemImage(URL.createObjectURL(file));
    }
  };

  //adding special items to database
  const handleAddItem = async () => {
    if (itemName && imagePath) {
      const formData = new FormData();
      formData.append('item_name', itemName);
      formData.append('img', imagePath);

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/add-special-menu`, {
          method: 'POST',
          credentials: 'include',
          body: formData,
        });
        const data = await response.json();

        if (data.success) {
          alert('Special item added successfully.');
          setItems([...items, { name: itemName, image: itemImage }]);
          setItemName('');
          setItemImage(null);
          setImagePath(null);
          handleClose();
        } else {
          alert('Failed to add special item.');
        }
      } catch (error) {
        console.log("Error on adding menu:", error);
      }
    } else {
      alert("Please provide both an item name and image.");
    }
  };

    //for getting all the special menus
    const getSpecialMenu = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/get-special-menu`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        if(data.success){
          console.log(data.specialMenuItems);
        }
      } catch (error) {
        console.log("Error on getting special menu:", error);
      }
    };


  //deleting special menu items

  // instead of index send >> id << of the of the data to delete
  const handleRemoveItem = async(index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);

    // Delete item from database

    //>> uncomment below code <<<<<
    // try {
    //     const response = await fetch(`${process.env.REACT_APP_API_URL}/delete-special-menu/${id}`, {
    //       method: 'DELETE',
    //       credentials: 'include',
    //     });
    //     const data = await response.json();
    //     if (data.success) {
    //       alert('Special item deleted successfully.');
    //     } else {
    //       alert('Failed to delete special item.');
    //     }
    // } catch (error) {
    //   console.log("Error on deleting menu:", error); 
    // }
  };


  
  useEffect(() => {
    getSpecialMenu();
  }, []);


  return (
    <section>
      <div className='special-div'>
        <h1>Today's Special</h1>
        <div style={{ display: "flex" }}>
          {items.map((item, index) => (
            <div className='special-card' key={index}>
              <img src={item.image} alt={item.name} style={{ width: "100%", height: "60%", objectFit: "cover" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: ".5rem" }}>
                <p style={{ fontSize: "1.2rem", letterSpacing: "3px", marginRight: "2rem" }}>{item.name}</p>
                <FaTrash
                  style={{ cursor: "pointer", color: "red", marginLeft: "2rem" }}
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
  const[filePath, setFilePath] = useState(null); 
  const [drinkfile, setDrinkFile] = useState(null);
  const [drinkFilePath, setDrinkFilePath] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile && selectedFile.type === "application/pdf") {
      setFilePath(selectedFile);
      setFile(URL.createObjectURL(selectedFile));
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleDrink = (event) => {
    const selectedFile2 = event.target.files[0];
    if (selectedFile2 && selectedFile2.type === "application/pdf") {
      setDrinkFilePath(selectedFile2);
      setDrinkFile(URL.createObjectURL(selectedFile2));
    } else {
      alert("Please upload a valid PDF file.");
    }
  };


// for uploading menu and dirnk pdf

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', filePath);
    formData.append('drink', drinkFilePath);

    try {
      const response =await fetch(`${process.env.REACT_APP_API_URL}/add-menu-pdf`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      const data = await response.json();
      if(data.success){
        alert('Menu added successfully');
        getMenuPdf();
      }else{
        alert('Failed to add menu');
      }
      
    } catch (error) {
      console.log("Error on adding menu:", error);
    } 
  };

// for getting all the menu pdfs
const getMenuPdf = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/get-menu-pdf`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    if(data.success){
      console.log(data.menuPdfs);
    }
  } catch (error) {
    console.log("Error on getting menu pdf:", error);
  }
}


// for deleting menu pdf

const handleDelete = async(id) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/delete-menu-pdf/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const data = await response.json();
    if(data.success){
      alert('Menu deleted successfully');
      getMenuPdf();
    }else{
      alert('Failed to delete menu');
    }
  } catch (error) {
    console.log("Error on deleting menu:", error);
  }
}

useEffect(() => {
  getMenuPdf();
}, []);



  return (
    <>
      <div className="menu-content">
        <Special />
        <div className='menu-file'>
          <form onSubmit={handleSubmit}>
            <input
              accept="application/pdf"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              name="MenuPDF"
              onChange={handleFileChange}
            />
            <label htmlFor="raised-button-file">
              <Button variant="contained" component="span" className='upload-img2' style={{ marginLeft: "2rem", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "transparent", border: "1px solid black", padding: ".5rem 1rem", color: "black" }}>
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
              <Button variant="contained" component="span" className='upload-img2' style={{ marginLeft: "2rem", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "transparent", border: "1px solid black", padding: ".5rem 1rem", color: "black" }}>
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
            <Button type="submit" variant="contained" className='submit-button' style={{ marginLeft: "2rem", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "" }}>
              Confirm Upload
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Menu;
