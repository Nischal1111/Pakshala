import React from 'react'
import "../Css/About.css"
import { MdCall } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";

const ContactDetail = () => {
  return (
    <div className='about-choose'>
      <div className="contact-container">
        <div style={{margin:"0rem 3rem", backgroundColor:"bisque",height:"100%",position:"relative"}}>
        <h1 className='contact-title'>Our Contacts</h1>
        <hr className='contact-line'/>
        <div className="contact-icons">
          <MdCall/>
          < MdLocationOn />
        </div>
        </div>
      </div>
    </div>
  )
}

export default ContactDetail
