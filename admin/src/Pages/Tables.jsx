import React, { useState } from 'react';
import "../css/menu.css";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Modal, Box, TextField, Button} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const TableList = ({ tableData, setTableData }) => {
  const [search, setSearch] = useState('');

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleEdit = (id) => {
    console.log(`Edit table with id: ${id}`);
  };

  const handleDelete = async(id) => {
    // eslint-disable-next-line no-restricted-globals
    const userConfirmed = confirm("Are you sure you want to delete this table?");
    if (userConfirmed) {
      setTableData(tableData.filter(item => item.id !== id));
    }
  };

  const filteredTable = tableData.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className='menu-table'>
        <div className="menu-search">
          <input type="text" value={search} onChange={handleSearchChange} className='menu-search' placeholder='Search' />
        </div>
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
              {filteredTable.map((item, index) => (
                <TableRow key={item.id} className='table-row'>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className='table-row'>
                    {item.img ? <img src={item.img} alt={item.title} className="menu-img" /> : 'No Image'}
                  </TableCell>
                  <TableCell className='table-row'>{item.title}</TableCell>
                  <TableCell className='table-row'>{item.category}</TableCell>
                  <TableCell className='table-row'>{item.guests}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(item.id)}>
                      <Edit className='menu-edit' />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(item.id)}>
                      <Delete className='menu-delete' />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

const Tables = () => {
  const [tableData, setTableData] = useState([
    { id: 1, img: "https://via.placeholder.com/150", title: "Terrace-1", category: "Outdoor Terrace", guests: 8 },
    { id: 2, img: "https://via.placeholder.com/150", title: "B-2", category: "Bar", guests: 5 },
    { id: 3, img: "https://via.placeholder.com/150", title: "Dining-1", category: "Dining", guests: 8 }
  ]);
  const [open, setOpen] = useState(false);
  const [newTable, setNewTable] = useState({ title: '', category: '', guests: '', img: null });
  const [errors, setErrors] = useState({ title: false, category: false, guests: false, img: false });
  const [imagePreview, setImagePreview] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'img') {
      setNewTable({ ...newTable, img: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
      setErrors({ ...errors, img: false });
    } else {
      setNewTable({ ...newTable, [name]: value });
      setErrors({ ...errors, [name]: false });
    }
  };

  const handleSubmit = async() => {
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

    const newTableData = {
      ...newTable,
      id: tableData.length + 1,
      img: imagePreview
    };

    setTableData([...tableData, newTableData]);
    setNewTable({ title: '', category: '', guests: '', img: null });
    setImagePreview(null);

    handleClose();
  };

  return (
    <>
      <div className="menu-content">
        <button onClick={handleOpen} className='add-item'>Add Table</button>
        <TableList tableData={tableData} setTableData={setTableData} />
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box className="modal-box">
          <h2 style={{textAlign:"center"}}>Add New Table</h2>
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
    </>
  );
}

export default Tables;