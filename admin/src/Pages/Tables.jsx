import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Modal, Box, TextField, Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const Tables = () => {
  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = useState(false);
  const [newTable, setNewTable] = useState({ title: '', category: '', guests: '', img: null });
  const [errors, setErrors] = useState({ title: false, category: false, guests: false, img: false });
  const [imagePreview, setImagePreview] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTableData, setEditTableData] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null); // State to store the editing index
  const [editImagePreview, setEditImagePreview] = useState(null);

  // Function to fetch table data
  const getAllTableItems = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/get-table-items`,{
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        setTableData(data.tableItems);
      }
    } catch (error) {
      console.error('Error fetching table items:', error);
    }
  };

  useEffect(() => {
    getAllTableItems();
  }, []);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setEditModalOpen(false);
    setEditTableData(null);
    setEditingIndex(null);
    setImagePreview(null);
    setEditImagePreview(null); 
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (editModalOpen) {
      // Editing existing table item
      if (name === 'img') {
        setEditTableData({ ...editTableData, img: files[0] });
        setEditImagePreview(URL.createObjectURL(files[0]));
      } else {
        setEditTableData({ ...editTableData, [name]: value });
      }
    } else {
      // Adding new table item
      if (name === 'img') {
        setNewTable({ ...newTable, img: files[0] });
        setImagePreview(URL.createObjectURL(files[0]));
        setErrors({ ...errors, img: false });
      } else {
        setNewTable({ ...newTable, [name]: value });
        setErrors({ ...errors, [name]: false });
      }
    }
  };

  const handleSubmit = async () => {
    const newErrors = {
      title: newTable.title.trim() === '',
      category: newTable.category.trim() === '',
      guests: newTable.guests.trim() === '',
      img: newTable.img === null
    };

    if (Object.values(newErrors).some(error => error)) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append('name', newTable.title);
    formData.append('category', newTable.category);
    formData.append('guest', newTable.guests);
    formData.append('img', newTable.img);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/add-table-item`, {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        console.log(data.message);
        getAllTableItems();
      } else {
        console.error('Error adding table item:', data.error);
      }
    } catch (error) {
      console.error('Error adding table item:', error);
    }

    setNewTable({ title: '', category: '', guests: '', img: null });
    setImagePreview(null);
    handleClose();
  };

  const handleEdit = (id) => {
    const tableToEdit = tableData.find(item => item._id === id);
    const index = tableData.findIndex(item => item._id === id); // Find the index of the table item
    console.log(`Editing table no. ${index + 1}`); // Log the index of the table item being edited
    setEditTableData(tableToEdit);
    setEditImagePreview(tableToEdit.table_image || null); // Set existing image for preview
    setEditingIndex(index + 1); // Set editing index for display in modal
    setEditModalOpen(true);
  };


  // editing the table

  const handleEditSubmit = async () => {
    // console.log('Updated Values:', editTableData); // Log updated values
  
    const formData = new FormData();
    formData.append('name', editTableData.title);
    formData.append('category', editTableData.category);
    formData.append('guest', editTableData.guests);
    formData.append('img', editTableData.img);
    formData.append('oldImgId', editTableData.table_image.public_id);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/edit-table-item/${editTableData._id}`, {
        method: 'PATCH',
        credentials: 'include',
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        console.log(data.message);
        getAllTableItems();
        handleClose();
      } else {
        console.error('Error editing table item:', data.message);
      }
    }catch (error) {
      console.error('Error editing table item:', error);
    }
  };



  //deleting the table item

  const handleDelete = async (id) => {
    const itemToDelete = tableData.find(item => item._id === id);
    //eslint-disable-next-line no-restricted-globals
    const userConfirmed = window.confirm("Are you sure you want to delete this table?");
    if (userConfirmed) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/delete-table-item/${id}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ imageId: itemToDelete.table_image.public_id })
        });

        const data = await response.json();
        if (data.success) {
          setTableData(tableData.filter(item => item._id !== id));
        } else {
          console.error('Error deleting table item:', data.error);
        }
      } catch (error) {
        console.error('Error deleting table item:', error);
      }
    }
  };

  return (
    <>
      <div className="menu-content">
        <button onClick={handleOpen} className='add-item'>Add Table</button>
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
                  <TableCell style={{ fontSize: "1.2rem", letterSpacing: "1px", fontWeight: "500" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Render rows from tableData */}
                {tableData.map((item, index) => (
                  <TableRow key={item._id} className='table-row'>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className='table-row'>
                      {item.table_image ? <img src={item.table_image.url} alt={item.table_name} className="menu-img" /> : 'No Image'}
                    </TableCell>
                    <TableCell className='table-row'>{item.table_name}</TableCell>
                    <TableCell className='table-row'>{item.table_category}</TableCell>
                    <TableCell className='table-row'>{item.table_guests}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(item._id)}>
                        <Edit className='menu-edit' />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(item._id)}>
                        <Delete className='menu-delete' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      {/* Add Table Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box className="modal-box" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
          <h2 style={{ textAlign: "center" }}>Add New Table</h2>
          <form>
            <TextField
              label="Name"
              name="title"
              value={newTable.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={errors.title}
              helperText={errors.title ? "Name is required" : ""}
            />
            <TextField
              label="Category"
              name="category"
              value={newTable.category}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={errors.category}
              helperText={errors.category ? "Category is required" : ""}
            />
            <TextField
              label="Guests"
              name="guests"
              type="number"
              value={newTable.guests}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={errors.guests}
              helperText={errors.guests ? "Number of guests is required" : ""}
            />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              name="img"
              onChange={handleChange}
            />
            <label htmlFor="raised-button-file">
              <Button variant="contained" component="span" className='upload-img'>
                Upload Image
              </Button>
            </label>
            {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
            {errors.img && <p style={{ color: 'red' }}>Image is required</p>}
            <Box display="flex" justifyContent="space-between" marginTop="16px">
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Add
              </Button>
              <Button variant="contained" color="secondary" onClick={handleClose} style={{ backgroundColor: 'red' }}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
      {/* Edit Table Modal */}
      <Modal open={editModalOpen} onClose={handleClose}>
        <Box className="modal-box" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
          <h2 style={{ textAlign: "center" }}>Editing table number {editingIndex}</h2>
          <form>
            <TextField
              label="Name"
              name="title"
              value={editTableData?.title || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Category"
              name="category"
              value={editTableData?.category || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Guests"
              name="guests"
              type="number"
              value={editTableData?.guests || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file-edit"
              type="file"
              name="img"
              onChange={handleChange}
            />
            <label htmlFor="raised-button-file-edit">
              <Button variant="contained" component="span" className='upload-img'>
                Upload Image
              </Button>
            </label>
            {editImagePreview && <img src={editImagePreview.url} alt="Preview" className="image-preview" />}
            <Box display="flex" justifyContent="space-between" marginTop="16px">
              <Button variant="contained" color="primary" onClick={handleEditSubmit}>
                Update
              </Button>
              <Button variant="contained" color="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default Tables;
