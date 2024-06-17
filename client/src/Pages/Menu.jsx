import React from 'react'
import { motion } from 'framer-motion'
import "../Css/menu.css"
import Nav from "../components/Nav"
import { fadeIn } from "../motion/motion";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import MenuForm from "../components/MenuForm"
import { Link } from 'react-router-dom';
import Footer from "../components/Footer"

const MenuMain = () => {
  return (
    <>
      <img src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800" alt="menupage" className='menu-home' />
      <h1 className='menu-h1'>Menu</h1>
    </>
  )
}

const SpecialMenuCard = ({ menu, index }) => {
  return (
    <motion.div className='special-card'
      style={{ backgroundColor: "#F3EEEA", position: "relative" }}
      variants={fadeIn("up", "spring", index * .01, .1)}
      viewport={{ once: "true" }}
      initial="hidden"
      whileInView="show">
      <CardMedia
        component="img"
        alt={menu.name}
        image={menu.image}
        className='menucard-img'
      />
      <CardContent>
        <div className="nameandrating" style={{ display: "flex", alignItems: "center" }}>
          <Typography gutterBottom component="div" style={{ fontFamily: "Lato", fontSize: "1.1rem", letterSpacing: "2px" }}>
            {menu.name}
          </Typography>
        </div>
        <p>Rs {menu.price}</p>
      </CardContent>
    </motion.div>
  )
}

const MenuSpecial = ({ specialMenu }) => {
  return (
    <>
      <h1 style={{ textAlign: "center", fontSize: "3rem", fontWeight: "400", letterSpacing: "6px", margin: "1rem 0rem" }}>
        Today's Special
      </h1>
      <div className="special-menu-container">
        {specialMenu.map((menu, index) => (
          <SpecialMenuCard key={menu.id} menu={menu} index={index} />
        ))}
      </div>
    </>
  )
}

const Menu = () => {
  const specialMenu = [
    {
      id: 1,
      name: "Grilled Chicken",
      image: "https://images.pexels.com/photos/628776/pexels-photo-628776.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: 250,
    },
    {
      id: 2,
      name: "Veggie Salad",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: 150,
    },
    {
      id: 3,
      name: "Pasta Alfredo",
      image: "https://images.pexels.com/photos/8500/food-dinner-pasta-spaghetti-8500.jpg?auto=compress&cs=tinysrgb&w=800",
      price: 200,
    },
    {
      id: 4,
      name: "Tandoori Paneer",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: 300,
    },
  ];

  return (
    <>
      <Nav />
      <motion.div initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 2, ease: [0.17, 0.67, 0.83, 0.67] }}>
        <MenuMain />
        <MenuSpecial specialMenu={specialMenu} />
        <div className=''>
          <p>
            You can view our menu <Link>here.</Link> You will be redirected to a new page where you can explore all our offerings. Once you've made your selection, please use the form below to place your order.
          </p>
          <button className='overlay2'>
            <h2> View Menu </h2>
          </button>
        </div>
        <MenuForm/>
        <Footer/>
      </motion.div>
    </>
  )
}

export default Menu
