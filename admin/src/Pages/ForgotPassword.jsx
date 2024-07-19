import React, { useState } from "react"
import { TextField, Button, Container, Typography, Box } from "@mui/material"
import { useNavigate, Link } from "react-router-dom"

const ForgotPassword = () => {
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

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Forgot Password
        </Typography>
        <Typography variant="body1" gutterBottom>
          Enter your email address to receive an OTP.
        </Typography>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSendOTP}
          sx={{ mt: 2 }}
        >
          Send OTP
        </Button>
        {success && (
          <>
            <p>{data.message}</p>
            <Link to={`/create-new-password/${token}`}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Go to Next page
              </Button>
            </Link>
          </>
        )}
      </Box>
    </Container>
  )
}

export default ForgotPassword
