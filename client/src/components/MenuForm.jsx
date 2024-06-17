import React from 'react'
import "../Css/About.css"

const ContactForm = () => {
  return (
    <div className='menu-choose2'>
      <div className="menu-container-form">
        <h3>Order Here</h3>
        <div className='menu--form'>
            <form>
                <input className='menu--input' placeholder='Enter your Username' name='username' type='text' autoComplete='off' required/>
                <input className='menu--input' placeholder='Enter your E-mail' name='Email' type='email' autoComplete='off' required/>
                <input className='menu--input' placeholder='Enter your contact number' name='contact' type='number' autoComplete='off' required/>
                <textarea name='message' placeholder='Place your order here (menu items)' cols='30'rows='6' autoComplete='off' required></textarea>
            <input type='submit' value='Place Order' className='contact--btn'></input>
            </form>
        </div>
      </div>
    </div>
  )
}

export default ContactForm
