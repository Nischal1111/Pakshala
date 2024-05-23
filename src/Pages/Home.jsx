import React from 'react'
import Nav from '../components/Nav'
import PakshalaHome from "/Users/nischalneupane/Desktop/pakshala/src/assets/pakshalahome.jpeg"

const Home = () => {
  return (
    <div>
        <Nav/>
        <img src={PakshalaHome} alt="Pakshala Home" className='pakshala-home' />
    </div>
  )
}

export default Home
