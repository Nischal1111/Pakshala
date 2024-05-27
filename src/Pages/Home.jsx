import React from 'react';
import Nav from '../components/Nav';
import MenuDescription from '../components/MenuDescription';
import BgHome from "../assets/mark-mc-neill-XZbcQwHDJmg-unsplash.jpg"
import LookAround from '../components/LookAround';
import ReservationDesc from '../components/ReservationDesc';
import Footer from '../components/Footer';
import HomeDescripton from '../components/HomeDescripton';

import {Background, Parallax} from "react-parallax";


const Home = () => {
  return (
    <div style={{ overflowX: "hidden"}} >
      <Nav />
      <Parallax strength={600}>
        <Background className="custom-bg">
            <img src={BgHome} alt="pakshala" className="pakshala-home"/>
        </Background>
        <div className="par-content"></div>
      </Parallax>
      <Parallax strength={600}>
          <HomeDescripton/>
      </Parallax>
      <Parallax strength={600}>
        <MenuDescription />
      </Parallax>
      <Parallax strength={600}>
        <LookAround />
      </Parallax>
      <Parallax strength={600}>
        <ReservationDesc />
      </Parallax>
      <Footer />
    </div>
  );
}

export default Home;
