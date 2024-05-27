import React from 'react'
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import "../Css/About.css"
import AboutDesc from '../components/AboutDesc'
import ContactDetail from '../components/ContactDetail'
import ContactForm from '../components/ContactForm'

import {Background, Parallax} from "react-parallax";

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
      <Parallax strength={600}>
          <Background className="custom--about">
            <img src="https://images.pexels.com/photos/1581554/pexels-photo-1581554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="pakshala" className="about--bg"/>
          </Background>
          <ContactDetail/>
          <ContactForm/>
      </Parallax>
      <Footer/>
    </div>
  )
}

export default About;
