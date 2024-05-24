import React from 'react'
import Nav from '../components/Nav'
import PakshalaHome from "/Users/nischalneupane/Desktop/pakshala/src/assets/pakshalahome.jpeg"
import HomeDescripton from '../components/HomeDescripton'
import MenuDescription from '../components/MenuDescription'
import LookAround from '../components/LookAround'
import ReservationDesc from '../components/ReservationDesc'

const Home = () => {
  return (
    <div style={{overflowX:"hidden"}}>
        <Nav/>
        <img src={PakshalaHome} alt="Pakshala Home" className='pakshala-home' />
        <HomeDescripton/>
        <MenuDescription/>
        <LookAround/>
        <ReservationDesc/>
    </div>
  )
}

export default Home
