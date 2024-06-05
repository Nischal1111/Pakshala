import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  const activePage = (pathname) => {
    return location.pathname === pathname ? "activeSideNav" : "";
  };

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
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
