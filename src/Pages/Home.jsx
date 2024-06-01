import React from 'react';
import MenuDescription from '../components/MenuDescription';
import LookAround from '../components/LookAround';
import ReservationDesc from '../components/ReservationDesc';
import HomeDescripton from '../components/HomeDescripton';
import BgHome from "../assets/dinesh-ramaswamy-p-sEkj6-hAM-unsplash.jpg"
import { motion } from 'framer-motion';

import { Parallax,Background } from 'react-parallax';
import Footer from '../components/Footer';
import Nav from '../components/Nav';

const Home = () => {
  return (
    <motion.div style={{ overflowX: "hidden"}} initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: [0.17, 0.67, 0.83, 0.67] }}>
        <Nav/>
      <Parallax strength={400}>
        <Background className='custom-bg'>
          <img src={BgHome} alt="pakshala" className="pakshala-home"/>
        </Background>
          <div className="par-content"></div>
      </Parallax>
      <Parallax strength={600}>
        <HomeDescripton/>
      </Parallax>
      <MenuDescription />
      <LookAround />
      <ReservationDesc />
      <Footer/>
    </motion.div>
  );
}

export default Home;
