import React,{useState} from 'react';
import "../css/menu.css"
import { FaPlus} from "react-icons/fa";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const Special = () => {
  return (
    <section>
        <div className='special-div'>
            <h1>Today's Special</h1>
            <div style={{display:"flex"}}>
                <div  className='special-card'>
                    <FaPlus style={{fontSize:"2.5rem",color:"#B4B4B8"}}/>
                </div>
                <div className='special-card'>
                    <FaPlus style={{fontSize:"2.5rem",color:"#B4B4B8"}}/>
                </div>
                <div className='special-card'>
                    <FaPlus style={{fontSize:"2.5rem",color:"#B4B4B8"}}/>
                </div>
                <div className='special-card'>
                    <FaPlus style={{fontSize:"2.5rem",color:"#B4B4B8"}}/>
                </div>
            </div>
        </div>
    </section>
  )
}

const MenuTable = () => {
  const [search, setSearch] = useState('');
  const [menuData, setMenuData] = useState([
    {   
        id: 1, 
        img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww", 
        title: "Veg Burger", 
        price: 400 },
    { 
        id: 2, 
        img: "https://images.unsplash.com/photo-1617622141573-2e00d8818f3f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hvd21laW58ZW58MHx8MHx8fDA%3D", 
        title: "Chicken Chowmein", 
        price: 500 
    },
    { 
        id: 3, 
        img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D", 
        title: "Cheese Pizza", 
        price: 600 
    }
  ]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleEdit = (id) => {
    console.log(`Edit item with id: ${id}`);
  };

  const handleDelete = (id) => {
     // eslint-disable-next-line no-restricted-globals
   const userConfirmed = confirm("Are you sure you want to delete this item?");
    
    if (userConfirmed) {
      console.log(`Delete item with id: ${id}`);
      setMenuData(menuData.filter(item => item.id !== id));
    }
  };

  const filteredMenu = menuData.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className='menu-table'>
        <div className="menu-search">
            <input type="text" value={search} onChange={handleSearchChange} className='menu-search' placeholder='Search'/>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead className='table-head'>
              <TableRow>
                <TableCell style={{fontSize:"1.2rem",letterSpacing:"1px",fontWeight:"500"}}>SN</TableCell>
                <TableCell style={{fontSize:"1.2rem",letterSpacing:"1px",fontWeight:"500"}}>Image</TableCell>
                <TableCell style={{fontSize:"1.2rem",letterSpacing:"1px",fontWeight:"500"}}>Name</TableCell>
                <TableCell style={{fontSize:"1.2rem",letterSpacing:"1px",fontWeight:"500"}}>Price</TableCell>
                <TableCell style={{fontSize:"1.2rem",letterSpacing:"1px",fontWeight:"500"}}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMenu.map((item, index) => (
                <TableRow key={item.id} className='table-row'>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className='table-row'>
                    {item.img ? <img src={item.img} alt={item.title} className="menu-img" /> : 'No Image'}
                  </TableCell>
                  <TableCell className='table-row'>{item.title}</TableCell>
                  <TableCell className='table-row'>Rs. {item.price}</TableCell>
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

const Menu = () => {
    return (
    <>
    <div className="menu-content">
        <Special/>
        <MenuTable/>
    </div>
    </>
    );
}

export default Menu;
