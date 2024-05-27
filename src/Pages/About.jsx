import React from 'react'
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import "../Css/About.css"
import AboutDesc from '../components/AboutDesc'
import ContactDetail from '../components/ContactDetail'

const About = () => {
  return (
    <div style={{overflowX:"hidden"}}>
      <Nav/>
      <div className="mainContainer">
        <div className="wave top red">
          <h1>About Us</h1>
        </div>
      </div>
      <AboutDesc/>
      <ContactDetail/>
      <Footer/>
    </div>
  )
}

export default About;
