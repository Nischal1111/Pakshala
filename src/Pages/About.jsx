import React from 'react'
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import "../Css/About.css"

const About = () => {
  return (
    <div>
      <Nav/>
      <div className="mainContainer">
        <div className="wave top red">
          <h1>About Us</h1>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default About;
