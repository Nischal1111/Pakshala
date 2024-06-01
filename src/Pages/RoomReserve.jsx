import React from 'react';
import { useParams } from 'react-router-dom';
import  {allRooms} from "../data";
import "../Css/Rooms.css"
import { FaWifi } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";
import { GiWashingMachine } from "react-icons/gi";
import { IoCallSharp } from "react-icons/io5";
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const RoomReserve = () => {
  const { id } = useParams();
  const room = allRooms.find(room => room.id === parseInt(id));

  return (
    <>
    <Nav/>
    <div>
      <div className="room-reserve">
        <div className="left-part">
          <div className="room-reserve-img-div">
            <img src={room.image} alt={room.name} className="main-img" />
            <div className='small-imgs-div'>
              <img src={room.smallImg1} alt="Small 1" />
              <img src={room.smallImg2} alt="Small 2" />
              <img src={room.smallImg3} alt="Small 3" />
            </div>
          </div>
          <div className="room-reserve-desc">
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div className="nameandrating" style={{display:"flex",alignItems:"center"}}>
                <p style={{ fontFamily: "Lato", fontSize: "1.8rem", letterSpacing: "2px"}}>
                    {room.name}
                </p>
                 <p className="room-rating">
                        <IoStarSharp className='star-icons'/>{room.rating}
                    </p>
                </div>
                <div className="price-div-2">
                    <p className="room-price-2">Rs {room.price}</p>
                </div>
            </div>
            <p style={{fontSize:"1rem",fontFamily:"Lato",lineHeight:"2rem"}}>{room.description}</p>
            <div style={{display:"flex",gap:"1rem",alignItems:"center",margin:"1.2rem 0rem"}}>
              <FaUser/>
              <span>Up to {room.guests} guest/s</span>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:".8rem",marginTop:"1rem"}}>
              <div style={{background:"#ff8800",display:"flex",alignItems:"center",gap:".8rem",color:"aliceblue",padding:".2rem .7rem",borderRadius:"2rem"}}>
                <FaWifi style={{fontSize:"1rem"}}/>
                <span style={{fontSize:".8rem"}}>Wifi</span>
              </div>
              <div style={{background:"#8686f0",display:"flex",alignItems:"center",gap:".8rem",color:"aliceblue",padding:".2rem .7rem",borderRadius:"2rem"}}>
                <TbAirConditioning style={{fontSize:"1rem"}}/>
                <span style={{fontSize:".8rem"}}>Air-conditioned</span>
              </div>
              <div style={{background:"#03AED2",display:"flex",alignItems:"center",gap:".8rem",color:"aliceblue",padding:".2rem .7rem",borderRadius:"2rem"}}>
                <IoCallSharp style={{fontSize:"1rem"}}/>
                <span style={{fontSize:".8rem"}}>On-call service</span>
              </div>
              <div style={{background:"#74E291",display:"flex",alignItems:"center",gap:".8rem",color:"aliceblue",padding:".3rem .7rem",borderRadius:"2rem"}}>
                <GiWashingMachine style={{fontSize:"1rem"}}/>
                <span style={{fontSize:".8rem"}}>Laundry service</span>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="user-form">
            <div className="user-form-title">
              <h3>Reserve This room</h3>
            </div>
            <form>
              <div>
                <label>Name</label>
                <input type="text" required />
              </div>
              <div>
                <label>Email</label>
                <input type="email" required />
              </div>
              <div>
                <label>Check-in Date</label>
                <input type="date" required />
              </div>
              <div>
                <label>Check-out Date</label>
                <input type="date" required />
              </div>
              <button type="submit">Reserve</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default RoomReserve;
