import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import "../css/admindashboard.css";
import { userLogged } from '../components/Cookie';
import { lognotify } from '../components/Notify';
import { ToastContainer } from 'react-toastify';

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
    </div>
  );
};

export default AdminDashboard;
