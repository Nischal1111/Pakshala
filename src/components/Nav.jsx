import React, { useState,useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../Css/nav.css";
import PakshalaLogo from "../assets/pakshalalogo.png";

const Dropdown = ({ isVisible }) => {
  return (
    <div className={`dropdown ${isVisible ? 'visible' : ''}`}>
      <ul className='sub-menu'>
        <Link to="/reservations/rooms">
          <li>
            Rooms
          </li>
        </Link>
        <Link to="/reservations/tables">
          <li>
            Tables
          </li>
        </Link>
      </ul>
    </div>
  );
}

const Nav = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [isNavbarVisible, setNavbarVisible] = useState(true);
  const location = useLocation();

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setNavbarVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <div className={`navbar ${isNavbarVisible ? 'visible' : 'hidden'}`}>
      <Link to="/">
        <div className='logo'>
          <img src={PakshalaLogo} alt="PakshalaLogo" className='nav-logo' />
        </div>
      </Link>
      <div className='nav-link'>
        <Link to="/" className={`nav-link-item ${location.pathname === '/' ? 'clicked' : ''}`}>
          <p>Home</p>
        </Link>
        <div className={`nav-link-item ${location.pathname.includes('/reservations') ? 'clicked' : ''}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ cursor: "pointer" }}>
          <p>Reservations</p>
          <Dropdown isVisible={isDropdownVisible} />
        </div>
        <Link to="/menu" className={`nav-link-item ${location.pathname === '/menu' ? 'clicked' : ''}`}>
          <p>Menu</p>
        </Link>
        <Link to="/contacts" className={`nav-link-item ${location.pathname === '/contacts' ? 'clicked' : ''}`}>
          <p>Events</p>
        </Link>
        <Link to="/about" className={`nav-link-item ${location.pathname === '/about' ? 'clicked' : ''}`}>
          <p>About</p>
        </Link>
      </div>
      <div>
        <button className='location-button'><span> Location </span></button>
      </div>
    </div>
  )
}

export default Nav;
