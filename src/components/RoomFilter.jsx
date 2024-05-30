import React, { useState } from 'react';
import "../Css/Rooms.css";
import { fadeIn } from "../motion/motion";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { SectionWrapper } from "../motion/index";
import { ImSpinner2 } from "react-icons/im";

const allRooms = [
    {
        id: 1,
        category: 'premium',
        name: 'Single Room (Premium)',
        price: 3000,
        bed: 'single',
        guests: 1,
        image: 'https://images.pexels.com/photos/20390786/pexels-photo-20390786/free-photo-of-interior-design-of-room-in-house.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
        id: 2,
        category: 'premium',
        name: 'Single Bed (Premium)',
        price: 3000,
        bed: 'single',
        guests: 1,
        image: 'https://images.pexels.com/photos/1139784/pexels-photo-1139784.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
        id: 3,
        category: 'premium',
        name: 'Single Room (Premium)',
        price: 3000,
        bed: 'single',
        guests: 1,
        image: 'https://images.pexels.com/photos/5816562/pexels-photo-5816562.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
        id: 4,
        category: 'deluxe',
        name: 'Deluxe Room',
        price: 4000,
        bed: 'double',
        guests: 3,
        image: 'https://images.pexels.com/photos/16436911/pexels-photo-16436911/free-photo-of-neatly-made-bed-and-a-hanging-lamp-in-a-hotel-room.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
        id: 5,
        category: 'deluxe',
        name: 'Double Room',
        price: 4000,
        bed: 'double',
        guests: 3,
        image: 'https://images.pexels.com/photos/12970071/pexels-photo-12970071.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
        id: 6,
        category: 'luxury',
        name: 'Suite Room (Luxury)',
        price: 5500,
        bed: 'suite',
        guests: 2,
        image: 'https://images.pexels.com/photos/6394550/pexels-photo-6394550.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
        id: 7,
        category: 'luxury',
        name: 'Luxury Room (Suite)',
        price: 5500,
        bed: 'suite',
        guests: 2,
        image: 'https://images.pexels.com/photos/7031731/pexels-photo-7031731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
];

const RoomCard = ({ room, index }) => {
    return (
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
                className='service-img'
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={{ fontFamily: "Lato", fontSize: "2rem", letterSpacing: "3px", margin: "1rem 0rem" }}>
                    {room.name}
                </Typography>
                <Typography variant="body2" style={{ fontFamily: "Lato", fontSize: "1.2rem", letterSpacing: "1.4px", color: "black", lineHeight: "2rem" }}>
                    {room.name}
                </Typography>
            </CardContent>
            <CardActions>
                <Button> View Room</Button>
            </CardActions>
        </motion.div>
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
                        <RoomCard key={room.id} room={room} index={index} />
                    ))
                )}
            </div>
        </div>
    )
}

export default SectionWrapper(RoomFilter, "")
