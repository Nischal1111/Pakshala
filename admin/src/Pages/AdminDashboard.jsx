import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import "../css/admindashboard.css";
import { userLogged } from '../components/Cookie';
import Cookies from "js-cookie"

const AdminDashboard = () => {
  const navigate = useNavigate();
  const cookie = Cookies.get("accessToken");
  console.log(cookie)
  useEffect(() => {
    if (!userLogged()) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <Sidebar />
    </div>
  );
};

export default AdminDashboard;
