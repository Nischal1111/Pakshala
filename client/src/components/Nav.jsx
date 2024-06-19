import React, { useState,useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../Css/nav.css";
import PakshalaLogo from "../assets/pakshalalogo.png";

const Nav = () => {
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
        <Link to="/rooms" className={`nav-link-item ${location.pathname === '/rooms' ? 'clicked' : ''}`}>
          <p>Rooms</p>
        </Link>
        <Link to="/tables" className={`nav-link-item ${location.pathname === '/tables' ? 'clicked' : ''}`}>
          <p>Tables</p>
        </Link>
        <Link to="/menu" className={`nav-link-item ${location.pathname === '/menu' ? 'clicked' : ''}`}>
          <p>Menu</p>
        </Link>
        <Link to="/about" className={`nav-link-item ${location.pathname === '/about' ? 'clicked' : ''}`}>
          <p>About</p>
        </Link>
      </div>
      <div>
        <button className='location-button' onClick={()=>window.open("https://maps.app.goo.gl/s9Xgkrmjab5SZnTj6","_blank")}><span> Location </span></button>
      </div>
    </div>
  )
}

export default Nav;
