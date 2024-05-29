import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import "../Css/nav.css"
import PakshalaLogo from "../assets/pakshalalogo.png"

const Dropdown=({isVisible})=>{
    return (
        <div className={`dropdown ${isVisible ? 'visible' : ''}`}>
            <ul className='sub-menu'>
                <Link to="/rooms">
                    <li>
                        Rooms
                    </li>
                </Link>
                <Link to="/tables">
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

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };
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
            <div className="nav-link-item" onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave} style={{cursor:"pointer"}}>   
                <p>Reservations</p>
                <Dropdown isVisible={isDropdownVisible} />
            </div>       
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
