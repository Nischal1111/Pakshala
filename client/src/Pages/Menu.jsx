import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IoStarSharp } from 'react-icons/io5';
import "../Css/menu.css"
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import MenuForm from '../components/MenuForm';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { fadeIn } from '../motion/motion';

const MenuMain = () => {
  return (
    <>
      <img src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800" alt="menupage" className='menu-home' />
      <h1 className='menu-h1'>Menu</h1>
    </>
  );
};

const SpecialMenuCard = ({ item, index }) => {
  return (
    <>
      <motion.div
        className='special-card'
        style={{ backgroundColor: "#F3EEEA", position: "relative" }}
        variants={fadeIn("up", "spring", index * 0.01, 0.1)}
        initial="hidden"
        animate="show"
      >
        <CardMedia
          component="img"
          alt={item.item_name}
          image={item.item_image.url}
          className='menucard-img'
        />
        <CardContent>
          <div className="nameandrating" style={{ display: "flex", alignItems: "center" }}>
            <Typography gutterBottom component="div" style={{ fontFamily: "Lato", fontSize: "1.1rem", letterSpacing: "2px" }}>
              {item.item_name}
            </Typography>
            <p className="room-rating" style={{opacity:"1",backgroundColor: "#f8bd79"}}>
              <IoStarSharp className='star-icons' />4.5
            </p>
          </div>
        </CardContent>
      </motion.div>
    </>
  );
};

const MenuSpecial = ({ specialMenu }) => {
  return (
    <>
      <h1 style={{ textAlign: "center", fontSize: "3rem", fontWeight: "400", letterSpacing: "6px", margin: "1rem 0rem" }}>
        Today's Special
      </h1>
      <div className="special-menu-container">
        {specialMenu.map((item, index) => (
          <SpecialMenuCard key={item._id} item={item} index={index} />
        ))}
      </div>
    </>
  );
};

const Menu = () => {
  const [specialMenu, setSpecialMenu] = useState([]);

  const getSpecialMenu = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/get-special-menu`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        setSpecialMenu(data.specialMenuItems);
      } else {
        console.log('Failed to fetch special menu');
      }
    } catch (error) {
      console.error('Error fetching special menu:', error);
    }
  };

  useEffect(() => {
    getSpecialMenu();
  }, []);

  return (
    <>
      <Nav />
      <motion.div initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 2, ease: [0.17, 0.67, 0.83, 0.67] }}>
        <MenuMain />
        <MenuSpecial specialMenu={specialMenu} />
        <div className='view-menu'>
          <p className=''>
            You can view our menu <Link to="#">here</Link>. You will be redirected to a new page where you can explore all our offerings. Once you've made your selection, please use the form below to place your order.
          </p>
          <div>
            <button className='overlay2' onClick={() => window.open("", "_blank")}>
              <h2> View Food Menu </h2>
            </button>
            <button className='overlay2' onClick={() => window.open("", "_blank")}>
              <h2> View Drink Menu </h2>
            </button>
          </div>
        </div>
        <MenuForm />
        <Footer />
      </motion.div>
    </>
  );
};

export default Menu;
