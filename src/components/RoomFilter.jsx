import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../Css/Rooms.css";
import { FaWifi } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { fadeIn } from "../motion/motion";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { SectionWrapper } from "../motion/index";
import { ImSpinner2 } from "react-icons/im";
import { IoStarSharp } from "react-icons/io5";

const allRooms = [
    {
        id: 1,
        category: 'premium',
        name: 'Single Room',
        price: 3000,
        bed: 'single',
        guests: 1,
        image: 'https://images.pexels.com/photos/20390786/pexels-photo-20390786/free-photo-of-interior-design-of-room-in-house.jpeg?auto=compress&cs=tinysrgb&w=800',
        rating: "4.0"
    },
    {
        id: 2,
        category: 'premium',
        name: 'Single Bed',
        price: 3000,
        bed: 'single',
        guests: 1,
        image: 'https://images.pexels.com/photos/1139784/pexels-photo-1139784.jpeg?auto=compress&cs=tinysrgb&w=800',
        rating: "3.9"
    },
    {
        id: 3,
        category: 'premium',
        name: 'Single Room (Premium)',
        price: 3000,
        bed: 'single',
        guests: 1,
        image: 'https://images.pexels.com/photos/5816562/pexels-photo-5816562.jpeg?auto=compress&cs=tinysrgb&w=800',
        rating: "4.2"
    },
    {
        id: 4,
        category: 'deluxe',
        name: 'Deluxe Room',
        price: 4000,
        bed: 'double',
        guests: 3,
        image: 'https://images.pexels.com/photos/16436911/pexels-photo-16436911/free-photo-of-neatly-made-bed-and-a-hanging-lamp-in-a-hotel-room.jpeg?auto=compress&cs=tinysrgb&w=800',
        rating: "4.5"
    },
    {
        id: 5,
        category: 'deluxe',
        name: 'Double Room',
        price: 4000,
        bed: 'double',
        guests: 3,
        image: 'https://images.pexels.com/photos/12970071/pexels-photo-12970071.jpeg?auto=compress&cs=tinysrgb&w=800',
        rating: "4.6"
    },
    {
        id: 6,
        category: 'luxury',
        name: 'Suite Room (Luxury)',
        price: 5500,
        bed: 'suite',
        guests: 2,
        image: 'https://images.pexels.com/photos/6394550/pexels-photo-6394550.jpeg?auto=compress&cs=tinysrgb&w=800',
        rating: "4.8"
    },
    {
        id: 7,
        category: 'luxury',
        name: 'Luxury Room (Suite)',
        price: 5500,
        bed: 'suite',
        guests: 2,
        image: 'https://images.pexels.com/photos/7031731/pexels-photo-7031731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        rating: "4.9"
    }
];

console.log(allRooms);


const RoomCard = ({ room, index }) => {
    return (
        <>
        <motion.div className='singleroom-card'
            style={{ backgroundColor: "#F3EEEA", position: "relative" }}
            variants={fadeIn("up", "spring", index*.01,.1)}
            viewport={{ once: "true" }}
            initial="hidden"
            whileInView="show">
            <CardMedia
                component="img"
                alt={room.name}
                image={room.image}
                className='roomcard-img'
            />
            <CardContent>
                <div className="price-div">
                    <p className="room-price">Rs {room.price}</p>
                </div>
                <div className="nameandrating" style={{display:"flex",alignItems:"center"}}>
                <Typography gutterBottom component="div" style={{ fontFamily: "Lato", fontSize: "1.5rem", letterSpacing: "3px", margin: "1rem 0rem" }}>
                    {room.name}
                </Typography>
                 <p className="room-rating">
                        <IoStarSharp className='star-icons'/>{room.rating}
                    </p>
                </div>
                <Typography variant="body2" style={{ fontFamily: "Lato", fontSize: "1.2rem", letterSpacing: "1.4px", color: "black", lineHeight: "2rem" }}>
                    <div style={{display:"flex",gap:"1rem",alignItems:"center",marginTop:".8rem"}}>
                        <FaUser/>
                        <span>Up to {room.guests} guest/s</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:".8rem",marginTop:"2rem"}}>
                        <div style={{background:"#ff8800",display:"flex",alignItems:"center",gap:".8rem",color:"aliceblue",padding:".3rem 1.7rem",borderRadius:"2rem"}}>
                            <FaWifi style={{fontSize:"1.3rem"}}/>
                            <span style={{fontSize:".8rem"}}>Wifi</span>
                        </div>
                        <div style={{background:"#8686f0",display:"flex",alignItems:"center",gap:".8rem",color:"aliceblue",padding:".3rem 1.7rem",borderRadius:"2rem"}}>
                            <TbAirConditioning style={{fontSize:"1.3em"}}/>
                            <span style={{fontSize:".8rem"}}>Air-conditioned</span>
                        </div>
                    </div>
                </Typography>
            </CardContent>
            <Link to={`/RoomReserve/${room.id}`}>
                <div className="overlay">
                    <h2>View room</h2>
                </div>
            </Link>
        </motion.div>
        </>
    )
}

const RoomFilter = () => {
    const [loading, setLoading] = useState(false);
    const [roomList, setRoomList] = useState(allRooms);
    const [btnClicked,setClicked] = useState("all rooms")

    const handlefilter = (e) => {
        setLoading(true);

        setTimeout(() => {
            const choice = e.target.value.toLowerCase();
            setClicked(choice)
            if (choice === "all rooms") {
                setRoomList(allRooms);
            } else {
                setRoomList(allRooms.filter(room => room.category === choice));
            }

            setLoading(false);
        }, 1000);
    }

    return (
        <div className='room-filter'>
            <h1>Book a room</h1>
            <div className="filter-choice">
                <button value="all rooms" onClick={handlefilter} className={btnClicked==="all rooms" ? "clicked":""}>
                    All rooms
                </button>
                <button value="premium" onClick={handlefilter} className={btnClicked==="premium" ? "clicked":""}>
                    Premium
                </button>
                <button value="deluxe" onClick={handlefilter} className={btnClicked==="deluxe" ? "clicked":""}>
                    Deluxe
                </button>
                <button value="luxury" onClick={handlefilter} className={btnClicked==="luxury" ? "clicked":""}>
                    Luxury
                </button>
            </div>
            <div className="room-cards">
                {loading ? (
                    <div className='loading-spinner'>
                        <ImSpinner2 className='loading' />
                    </div>
                ) : (
                    roomList.map((room, index) => (
                        <>
                            <RoomCard key={room.id} room={room} index={index} />
                        </>
                    ))
                )}
            </div>
        </div>
    )
}

export default SectionWrapper(RoomFilter, "")
