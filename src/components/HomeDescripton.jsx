import React from 'react'
import DescImage from "/Users/nischalneupane/Desktop/pakshala/src/assets/deschome.jpeg"
import "../Css/HomeDesc.css"
import { fadeIn, zoomIn } from '../motion/motion'
import SectionWrapper from '../motion/SectionWrapper'
import { motion} from "framer-motion"

const HomeDescripton = () => {
  return (
    <motion.div className='home-desc'>
      <motion.div className="desc-text" variants={fadeIn()}>
            <h1 className='desc-h1'>Pakshala Restro and Bar</h1>
            <p className='desc-p'>Set on 37 acres of landscaped grounds, Hyatt Regency Kathmandu is a luxury five-star hotel designed in traditional Newari-style architecture, ideally located 
                only 4 kilometres away from the international airport. Situated in a city with a plethora of ancient sites and fascinating architecture, our hotel is a 
                gateway to the city’s top attractions like Boudhanath, Pashupatinath, Basantapur, Thamel, Bhaktapur Durbar Square, Patan Durbar Square and much more. 
                You not only experience luxurious hospitality, but you also get a cultural fest while at Hyatt Regency Kathmandu.</p>
      </motion.div>
      <div className="img-div">
        <motion.img src={DescImage} alt="Desc" className="img-desc" variants={zoomIn(0.1,.9)}/>
      </div>
    </motion.div>
  )
}

export default SectionWrapper(HomeDescripton,"")
