import React from 'react'
import Nav from "../components/Nav"
import "../Css/Rooms.css"
import { motion } from 'framer-motion'
import RoomFilter from '../components/RoomFilter'
import Footer from "../components/Footer"

const Rooms = () => {
  return (
    <motion.div exit={{ opacity: 1 }}
      initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.4, ease: [0.17, 0.67, 0.83, 0.67] }}>
      <Nav/>
      <img src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg" alt="reserve" className='reserve-main'/>
      <RoomFilter/>
      <Footer/>
    </motion.div>
  )
}

export default Rooms
