import React from 'react'
import "../Css/About.css"
import { MdCall } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";

const ContactForm = () => {
  return (
    <div className='about-choose2'>
      <div className="contact-container">
        <div style={{margin:"0rem 3rem", height:"100%",position:"relative"}}>
        <h1 className='contact-title'>Our Contacts</h1>
        <hr className='contact-line'/>
        <div className="contact-icons">
          <MdCall/>
          < MdLocationOn />
          <MdEmail/>
        </div>
        <div className="contact-hours">
          <h2>HOURS</h2>
          <h3>Sunday - Thursday<span>10am-10pm</span></h3>
          <h3>Friday - Sunday - <span>10am-2am</span></h3>
        </div>
        </div>
      </div>
    </div>
  )
}

export default ContactForm
