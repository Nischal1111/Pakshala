import React from 'react'
import Nav from "../components/Nav"
import "../Css/Rooms.css"
import RoomFilter from '../components/RoomFilter'

const Rooms = () => {
  return (
    <div>
      <Nav/>
      <img src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg" alt="reserve" className='reserve-main'/>
      <RoomFilter/>
    </div>
  )
}

export default Rooms
