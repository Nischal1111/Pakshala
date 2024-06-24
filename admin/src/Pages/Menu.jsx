import React, { useState, useEffect } from 'react';
import "../css/menu.css";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Button, Modal, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { userLogged } from "../components/Cookie";
import { notify } from '../components/Notify';
import { ToastContainer } from 'react-toastify';
import { ImSpinner2 } from "react-icons/im";
import { delnotify } from '../components/delnotify';
import { FaRegEye } from "react-icons/fa";

const Special = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemImage, setItemImage] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setItemName('');
    setItemImage(null);
    setImagePath(null);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePath(file);
      setItemImage(URL.createObjectURL(file));
    }
  };

  const handleAddItem = async () => {
    setLoading(true);
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
          notify();
          setItems([...items, { _id: data.newItem._id, item_name: itemName, item_image: { url: itemImage } }]);
          handleClose();
        } else {
          alert('Failed to add special item.');
        }
      } catch (error) {
        console.log("Error on adding menu:", error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please provide both an item name and image.");
      setLoading(false);
    }
  };

  const getSpecialMenu = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/get-special-menu`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        setItems(data.specialMenuItems);
      }
    } catch (error) {
      console.log("Error on getting special menu:", error);
    }
  };

  const handleRemoveItem = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/delete-special-menu/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await response.json();

      if (data.success) {
        setItems(items.filter((item) => item._id !== id));
        delnotify();
      } else {
        alert('Failed to delete special item.');
      }
    } catch (error) {
      console.log("Error on deleting menu:", error);
      alert('Failed to delete special item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSpecialMenu();
  }, []);

  return (
    <section>
      <ToastContainer />
      <div className='special-div'>
        <h1>Today's Special</h1>
        <div style={{ display: "flex" }}>
          {items.map((item) => (
            <div className='special-card' key={item._id}>
              <img src={item.item_image?.url} alt={item.item_name} style={{ width: "100%", height: "60%", objectFit: "cover" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: ".5rem" }}>
                <p style={{ fontSize: "1.2rem", letterSpacing: "3px", marginRight: "2rem" }}>{item.item_name}</p>
                <div className='fa-trash'>
                  <FaTrash
                    style={{ cursor: "pointer", color: "red", marginLeft: "2rem" }}
                    className='fa-trash-icon'
                    onClick={() => handleRemoveItem(item._id)}
                  />
                </div>
              </div>
            </div>
          ))}
          <div className='special-card' onClick={handleOpen}>
            <FaPlus style={{ fontSize: "2.5rem", color: "#B4B4B8" }} />
          </div>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className='modal-box' style={{ maxHeight: "90vh", overflow: "auto" }}>
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
            <Button variant="contained" component="span" style={{ border: "none", backgroundColor: "transparent", color: "blue", boxShadow: "none", textDecoration: "underline" }}>
              Upload Item Image
            </Button>
          </label>
          {itemImage && (
            <div>
              <img src={itemImage} alt="Preview" style={{ width: '100%', height: 'auto', marginTop: '10px' }} />
            </div>
          )}
          {loading ? (
            <div className='loading-spinner'>
              <ImSpinner2 className='loading' />
            </div>
          ) : (
            <Button variant="contained" color="primary" onClick={handleAddItem} style={{ marginTop: '10px' }}>
              Add Item
            </Button>
          )}
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
  const [filePath, setFilePath] = useState(null);
  const [drinkfile, setDrinkFile] = useState(null);
  const [drinkFilePath, setDrinkFilePath] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [MenuPDF,setMenuPDF]=useState(null)
  const [DrinkPDF,setDrinkPDF]=useState(null)
    const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', filePath);
    formData.append('drink', drinkFilePath);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/add-menu-pdf`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        notify()
        setFile(null)
        setDrinkFile(null)
        setUploadSuccess(true); // Set upload success state to true
        getMenuPdf();
      } else {
        alert('Failed to add menu');
      }
    } catch (error) {
      console.log("Error on adding menu:", error);
    }
  };

  const getMenuPdf = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/get-menu-pdf`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        console.log(data.menuPdfs[0].menu_file._id)
        setMenuPDF(data.menuPdfs[0].menu_file.menu_url)
        setDrinkPDF(data.menuPdfs[0].drink_file.menu_url)
      }
    } catch (error) {
      console.log("Error on getting menu pdf:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/delete-menu-pdf/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {

        delnotify()
        getMenuPdf();
      } else {
        alert('Failed to delete menu');
      }
    } catch (error) {
      console.log("Error on deleting menu:", error);
    }
  };

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
              <Button variant="contained" component="span" className='upload-img2' style={{ marginTop: "1rem", marginBottom: "1rem", backgroundColor: "transparent", border: "none", color: "black", boxShadow: "none", color: "blue",textDecoration:"underline" }}>
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
              <Button variant="contained" component="span" className='upload-img2' style={{ marginTop: "1rem", marginBottom: "1rem", backgroundColor: "transparent", border: "none", color: "black", boxShadow: "none", color: "blue",textDecoration:"underline"}}>
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
                  title="Drink PDF"
                ></iframe>
              </div>
            )}
            {loading ? <><div className='loading-spinner'>
              <ImSpinner2 className='loading' />
            </div></>:(<>
            <Button type="submit" variant="contained" className='submit-button' style={{ marginLeft: ".5rem", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "" }}>
              Confirm Upload
            </Button>
            </>)}
          </form>
          {uploadSuccess && (<>
          <div style={{display:"flex",flexDirection:"column"}}>
            <div>
            <Button variant="contained" className='view-button' onClick={()=>window.open(MenuPDF,"_blank")} style={{marginTop: "1rem", marginBottom: "1rem", backgroundColor: "transparent", border: "1px solid black", color: "black", boxShadow: "none"}}>
              View Food Menu <FaRegEye style={{marginLeft:".5rem"}}/>
            </Button>
             <FaTrash
                    style={{ cursor: "pointer", color: "red", marginLeft: "2rem" }}
                    className='fa-trash-icon'
                  />
            </div>
            <div>
            <Button variant="contained" className='view-button' onClick={()=>window.open(DrinkPDF,"_blank")} style={{ marginTop: "1rem", marginBottom: "1rem", backgroundColor: "transparent", border: "1px solid black", color: "black", boxShadow: "none" }}>
              View Drink Menu <FaRegEye style={{marginLeft:".5rem"}}/>
            </Button>
             <FaTrash
                    style={{ cursor: "pointer", color: "red", marginLeft: "2rem" }}
                    className='fa-trash-icon'
                    onClick={()=>handleDelete(MenuPDF._id)}
                  />
            </div>
          </div>
          </>
          )}
        </div>
      </div>
    </>
  );
};

export default Menu;

