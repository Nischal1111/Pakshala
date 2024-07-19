import React, { useContext, useState } from "react"
import { TextField, Button, Container, Typography, Box } from "@mui/material"
import { useNavigate, Link } from "react-router-dom"
import { TokenContext } from "../components/TokenContext"

const ForgotPassword = () => {
const {success,data,email,handleEmailChange,handleSendOTP,token}=useContext(TokenContext)

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
