import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const TokenContext = createContext();

const TokenProvider = ({ children }) => {


      const [email, setEmail] = useState("")
  const [token, setNewToken] = useState("")
  const [success, setSuccess] = useState(false)
  const [data, setData] = useState({})
  const navigate = useNavigate()

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSendOTP = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ email }),
        }
      )
      const data = await response.json()
      if (data.success) {
        setNewToken(data.token)
        setData(data)
        setSuccess(true)
      } else {
        alert(data.message)
      }
    } catch (error) {}
  }

  
  const contextValue = {
   token,setNewToken,success,setSuccess,data,setData,handleEmailChange,handleSendOTP
  };

  return (
    <TokenContext.Provider value={contextValue}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvider;
