import React from 'react'
import { Link } from 'react-router-dom'
import "../Css/nav.css"
import PakshalaLogo from "../assets/pakshalalogo.png"

const Nav = () => {
  return (
    <div className='navbar'>
        <Link to="/">
        <div className='logo'>
            <img src={PakshalaLogo} alt="PakshalaLogo" className='nav-logo'/>
        </div>
        </Link>
        <div className='nav-link'>
            <Link to="/" className='nav-link-item'>
                <p>Home</p>
            </Link>
            <Link to="/reservations" className='nav-link-item'>
                <p>Reservations</p>
            </Link>
            <Link to="/menu" className='nav-link-item'>
                <p>Menu</p>
            </Link>
            <Link to="/contacts" className='nav-link-item'>
                <p>Events</p>
            </Link>
            <Link to="/about" className='nav-link-item'>
                <p>About</p>
            </Link>
        </div>
        <div>
            <button className='location-button'><span> Location </span></button>
        </div>
    </div>
  )
}

export default Nav
