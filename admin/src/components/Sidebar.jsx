import React,{useEffect} from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import '../css/sidebar.css';
import Cookies from "js-cookie"
import {userLogged} from "../components/Cookie"

const Sidebar = () => {
    const navigate = useNavigate();

  useEffect(() => {
    if (!userLogged()) {
      navigate('/login');
    }
  }, [navigate]);
  const location = useLocation();

  const activePage = (pathname) => {
    return location.pathname === pathname ? "activeSideNav" : "";
  };

  const adminLogout = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/logout-admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const result = await response.json();
      if (result.success) {
        localStorage.setItem("logout","true")
        Cookies.remove("accessToken")

      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="left">
      <div className="leftContent">
        <h1>Admin Panel</h1>
        <hr className="line" />
        <div className="navigation_Lists">
          <Link to="/" className="nav-link">
            <button className={`distnav--button ${activePage("/")}`}>
              Dashboard
            </button>
          </Link>
          <Link to="/menu" className="nav-link">
            <button className={`distnav--button ${activePage("/menu")}`}>
              Menu
            </button>
          </Link>
          <Link to="/tables" className="nav-link">
            <button className={`distnav--button ${activePage("/tables")}`}>
              Table
            </button>
          </Link>
          <Link to="/rooms" className="nav-link">
            <button className={`distnav--button ${activePage("/rooms")}`}>
              Rooms
            </button>
          </Link>
          <Link to="/events" className="nav-link">
            <button className={`distnav--button ${activePage("/events")}`}>
              Events
            </button>
          </Link>
          <Link to="/offers" className="nav-link">
            <button className={`distnav--button ${activePage("/offers")}`}>
              Offers
            </button>
          </Link>
          <Link to="/login" className="nav-link" onClick={adminLogout}>
            <button onClick={adminLogout} className="distnav--button">
              Logout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
