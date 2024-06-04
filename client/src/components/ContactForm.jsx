import React from 'react'
import "../Css/About.css"

const ContactForm = () => {
  return (
    <div className='about-choose2'>
      <div className="contact-container-form">
        <h3>Send us Message</h3>
        <div className='contact--form'>
            <form action='https://formspree.io/f/meqwnega' method='POST'>
                <input className='contact--input' placeholder='Enter your Username' name='username' type='text' autoComplete='off' required/>
                <input className='contact--input' placeholder='Enter your E-mail' name='Email' type='email' autoComplete='off' required/>
                <textarea name='message' placeholder='Enter your message' cols='30'rows='6' autoComplete='off' required></textarea>
            <input type='submit' value='Send' className='contact--btn'></input>
            </form>
        </div>
      </div>
    </div>
  )
}

export default ContactForm
