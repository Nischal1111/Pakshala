import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "../Css/About.css"

const ContactForm = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  return (
    <div className='about-choose2' id='bookvenue'>
      <div className="contact-container-form">
        <h3>Send us Message</h3>
        <div className='contact--form'>
          <form action='https://formspree.io/f/meqwnega' method='POST'>
            <input className='contact--input' placeholder='Enter your Username' name='username' type='text' autoComplete='off' required />
            <input className='contact--input' placeholder='Enter your E-mail' name='Email' type='email' autoComplete='off' required />
            <input className='menu--input' placeholder='Enter your contact number' name='contact' type='number' autoComplete='off' required />
            <textarea name='message' placeholder='Enter your message' cols='30' rows='6' autoComplete='off' required></textarea>
            <input type='submit' value='Send' className='contact--btn' />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
