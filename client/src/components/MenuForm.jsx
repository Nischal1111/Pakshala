import React,{useState} from 'react'
import "../Css/About.css"

const ContactForm = () => {
  const[name,setName]=useState("")
  const [email, setEmail] = useState("")
  const [contact, setContact] = useState("")
  const [message, setMessage] = useState("")

  const handleNameChange = (event) => setName(event.target.value);
  const handleContactChange = (event) => setContact(event.target.value);
  const handleMessageChange = (event) => setMessage(event.target.value);

    const handleSubmit = (e) => {
      e.preventDefault()
      console.log(name, email, contact, message);
      setName("");
      setEmail("");
      setContact("");
      setMessage("");
  };
  return (
    <div className='menu-choose2'>
      <div className="menu-container-form">
        <h3>Order Here</h3>
        <div className='menu--form'>
            <form onSubmit={handleSubmit}>
                <input className='menu--input' placeholder='Enter your fullname' type='text' autoComplete='off' required onChange={handleNameChange}/>
                <input className='menu--input' placeholder='Enter your contact number' type='number' autoComplete='off' required onChange={handleContactChange}/>
                <textarea name='message' placeholder='Place your order here (menu items)' cols='30'rows='6' autoComplete='off' required onChange={handleMessageChange}></textarea>
                <button type='submit' className='contact--btn'>Place order</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default ContactForm
