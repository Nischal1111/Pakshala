import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link, useNavigate} from "react-router-dom"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Outnotify, notify} from "../components/Notify"
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

const defaultTheme = createTheme();

export default function Login() {

  const navigate = useNavigate();

  useEffect(()=>{
    setTimeout(()=>{
        if(localStorage.getItem("logout")==="true"){
        Outnotify()
        localStorage.removeItem("logout")
  }
    },500)
    },[])

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      email: data.get('email'),
      password: data.get('password'),
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login-admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        localStorage.setItem("notify","true")
        notify()
        navigate('/admin-dashboard');
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme} style={{fontFamily:"Lato"}}>
      <ToastContainer/>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4" style={{letterSpacing:"3px",textTransform:"uppercase",fontFamily:"Lato"}}>
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{backgroundColor:"black",padding:".7rem 2rem"}}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" style={{color:"#3ABEF9",fontSize:".8rem"}}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2" style={{color:"#3ABEF9",fontSize:".8rem"}}>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}