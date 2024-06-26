import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import "../css/admindashboard.css";
import { userLogged } from '../components/Cookie';
import { lognotify } from '../components/Notify';
import { ToastContainer } from 'react-toastify';
import {Link} from "react-router-dom"
import { IoFastFoodOutline } from "react-icons/io5";
import { MdBedroomParent } from "react-icons/md";
import { MdOutlineTableBar } from "react-icons/md";
import { MdEvent } from "react-icons/md";
import { FaBell } from "react-icons/fa";



const AdminDashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLogged()) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(()=>{
    setTimeout(()=>{
      if(userLogged() && localStorage.getItem("notify")==="true"){
        lognotify()
        localStorage.removeItem("notify")
      }
    },200)
  },[])

  return (
    <div>
      <ToastContainer/>
      <Sidebar />
      <div className="admin-dashboard">
        <h1 className='dashboard-title'>Dashboard for user reservations and bookings</h1>
        <section className='dashboard'>
          <Link to="/admin-dashboard/menu-dash" className='link-dash'>
            <div className='dashboard-card'>
              <div style={{display:"flex"}}>
                <IoFastFoodOutline className='dash-icon'/>
                <p>Menu Orders</p>
              </div>
              <FaBell className='dash-icon'/>
            </div>
          </Link>
          <Link to="/admin-dashboard/room-dash" className='link-dash'>
            <div className='dashboard-card'>
              <div style={{display:"flex"}}>
              <MdBedroomParent className='dash-icon'/>
              <p>Room Reservations</p>
              </div>
              <FaBell className='dash-icon'/>
            </div>
          </Link>
          <Link to="/admin-dashboard/table-dash" className='link-dash'>
            <div className='dashboard-card'>
              <div style={{display:"flex"}}>
                <MdOutlineTableBar className='dash-icon'/>
                <p>Table Reservations</p>
              </div>
              <FaBell className='dash-icon'/>
            </div>
          </Link>
          <Link to="/admin-dashboard/event-dash" className='link-dash'>
            <div className='dashboard-card'>
              <div style={{display:"flex"}}>
                <MdEvent className='dash-icon'/>
                <p>Event Bookings</p>
              </div>
              <FaBell className='dash-icon'/>
            </div>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
