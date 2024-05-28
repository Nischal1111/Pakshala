import React from 'react'
import "../Css/About.css"
// import DescImage from "../assets/deschome.jpeg"

const AboutDesc = () => {
  return (
    <div className='about-desc'>
      <div className='inside-about-div'>
        <div className="about-container">
            <div className="about-text">
                <h1 className='about-title'>ABOUT US</h1>
                <p>Set on 37 acres of landscaped grounds, Hyatt Regency Kathmandu is a luxury five-star hotel designed in traditional Newari-style architecture, ideally located 
                    only 4 kilometres away from the international airport. Situated in a city with a plethora of ancient sites and fascinating architecture, our hotel is a 
                    gateway to the city’s top attractions like Boudhanath, Pashupatinath, Basantapur, Thamel, Bhaktapur Durbar Square, Patan Durbar Square and much more. 
                    You not only experience luxurious hospitality, but you also get a cultural fest while at Hyatt Regency Kathmandu.
                </p>
            </div>
            <div className="about-img">
                <img src="https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D" alt="aboutImg" />
            </div>
        </div>
      </div>
    </div>
  )
}

export default AboutDesc
