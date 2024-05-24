import React from 'react'
import "../Css/Menudesc.css"
import mainFood from "/Users/nischalneupane/Desktop/pakshala/src/assets/mainfood.jpeg"
import secondFood from "/Users/nischalneupane/Desktop/pakshala/src/assets/secondfood.webp"
import thirdFood from "/Users/nischalneupane/Desktop/pakshala/src/assets/thirdfood.jpeg"


const MenuDescription = () => {
  return (
    <div className='menu-desc'>
        <div className="images-div">
            <div className="main-food-div">
                <img src={mainFood} alt="main-food" className='mainfood-img'/>
            </div>
            <div className="two-foods">
                <img src={secondFood} alt="" className="secondfood-img"/>
                <img src={thirdFood} alt="" className='thirdfood-img'/>
            </div>
        </div>
        <div className="menu-text">
            <h1>Exquisite Dining, Unforgettable Moments.</h1>
            <p>Set on 37 acres of landscaped grounds, Hyatt Regency Kathmandu is a luxury five-star hotel designed in traditional 
                Newari-style architecture, ideally located only 4 kilometres away from the international airport.
            </p>
            <button className="see-menu">
                View menu
            </button>
        </div>
    </div>
  )
}

export default MenuDescription
