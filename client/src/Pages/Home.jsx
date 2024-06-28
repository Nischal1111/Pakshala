import React, { useState, useEffect } from 'react';
import LookAround from '../components/LookAround';
import ReservationDesc from '../components/ReservationDesc';
import HomeDescripton from '../components/HomeDescripton';
import HomeBack from "../assets/homeback.jpg"
import OfferImage from "../assets/big.jpeg";
import { motion } from 'framer-motion';
import { Parallax } from 'react-parallax';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import { Modal, Box, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import Map from '../components/Map';
import { Link } from 'react-router-dom';

const Home = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    setOpen(true);
    const timer = setTimeout(() => {
      setOpen(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div style={{ overflowX: "hidden" }} initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: [0.17, 0.67, 0.83, 0.67] }}>
      <Nav />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="offer-modal-title"
        aria-describedby="offer-modal-description"
      >
        <Box 
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 1000,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 0,
            display: 'flex',
            outline:"none",
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <img src={OfferImage} alt="Special Offer" style={{ width: '100%', height: "100%" }} />
          <IconButton 
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
            style={{color:"white"}}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Modal>

      <Parallax strength={400}>
        <div className='pakshala-home-div'>
          <img src={HomeBack} alt="pakshala" className="pakshala-home" />
          <div className="text-home-bg">
            <h1>Exquisite Dining, Unforgettable Moments.</h1>
            <p>
              Set on 37 acres of landscaped grounds, Hyatt Regency Kathmandu is a luxury five-star hotel designed in traditional.
            </p>
            <Link to="/menu">
            <button>
              Order Now
            </button>
            </Link>
          </div>
        </div>
      </Parallax>
      <Parallax strength={600}>
        <HomeDescripton />
      </Parallax>
      <ReservationDesc />
      <LookAround />
      <Map/>
      <Footer />
    </motion.div>
  );
}

export default Home;
