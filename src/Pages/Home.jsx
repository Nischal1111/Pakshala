import React from 'react';
import Nav from '../components/Nav';
import MenuDescription from '../components/MenuDescription';
import LookAround from '../components/LookAround';
import ReservationDesc from '../components/ReservationDesc';
import Footer from '../components/Footer';
import HomeDescripton from '../components/HomeDescripton';
import BgHome from "../assets/dinesh-ramaswamy-p-sEkj6-hAM-unsplash.jpg"
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div style={{ overflowX: "hidden"}} initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: [0.17, 0.67, 0.83, 0.67] }}>
      <Nav />
      <img src={BgHome} alt="pakshala" className="pakshala-home"/>
      <HomeDescripton/>
      <MenuDescription />
      <LookAround />
      <ReservationDesc />
      <Footer />
    </motion.div>
  );
}

export default Home;
