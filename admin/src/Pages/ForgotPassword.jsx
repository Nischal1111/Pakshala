import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const ForgotPassword=()=> {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendOTP = () => {
    console.log('OTP sent to:', email);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
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
      </Box>
    </Container>
  );
}

export default ForgotPassword;
