import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../Css/nav.css";
import PakshalaLogo from "../assets/pakshalalogo.png";

const Nav = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [isNavbarVisible, setNavbarVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoc, setLoc] = useState(true);
  const location = useLocation();

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setNavbarVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    if(!isMenuOpen){
      setLoc(!isMenuOpen)
    }else{
      setLoc(isMenuOpen)
    }
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
      <div className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={handleMenuToggle}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={`nav-link ${isMenuOpen ? 'show' : ''}`}>
        <Link to="/" className={`nav-link-item ${location.pathname === '/' ? 'clicked' : ''}`} onClick={handleMenuToggle}>
          <p>Home</p>
        </Link>
        <Link to="/rooms" className={`nav-link-item ${location.pathname === '/rooms' ? 'clicked' : ''}`} onClick={handleMenuToggle}>
          <p>Rooms</p>
        </Link>
        <Link to="/tables" className={`nav-link-item ${location.pathname === '/tables' ? 'clicked' : ''}`} onClick={handleMenuToggle}>
          <p>Tables</p>
        </Link>
        <Link to="/menu" className={`nav-link-item ${location.pathname === '/menu' ? 'clicked' : ''}`} onClick={handleMenuToggle}>
          <p>Menu</p>
        </Link>
        <Link to="/about" className={`nav-link-item ${location.pathname === '/about' ? 'clicked' : ''}`} onClick={handleMenuToggle}>
          <p>About</p>
        </Link>
      </div>
      {showLoc && (
        <div>
          <button className='location-button' onClick={() => window.open("https://maps.app.goo.gl/s9Xgkrmjab5SZnTj6", "_blank")}><span> Location </span></button>
        </div>
      )}
    </div>
  )
}

export default Nav;
