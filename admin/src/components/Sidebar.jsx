import React, { useEffect, useState } from "react";
import { Link, useLocation} from "react-router-dom";
import "../css/sidebar.css";

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
          <button className={`distnav--button ${activePage("/")}`}>
            <Link to="/" className="nav-link">
              Dashboard
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
