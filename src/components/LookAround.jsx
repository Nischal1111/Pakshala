import React from 'react';
import "../Css/lookaround.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import {fadeIn} from "../motion/motion"
import { motion } from 'framer-motion';

import Img1 from "/Users/nischalneupane/Desktop/pakshala/src/assets/Img.jpeg"
import Img2 from "/Users/nischalneupane/Desktop/pakshala/src/assets/Img1.jpeg"
import Img3 from "/Users/nischalneupane/Desktop/pakshala/src/assets/Img3.jpeg"
import Img4 from "/Users/nischalneupane/Desktop/pakshala/src/assets/Img4.jpeg"

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

const LookAround = () => {
    const slide=[
        {
            img:Img1,
            title:"Pakshala"
        },
        {
            img:Img2,
            title:"Bar"
        },
        {
            img:Img3,
            title:"Rooftop"
        },
        {
            img:Img4,
            title:"Room"
        }
]
    return (
    <motion.div className="container" variants={fadeIn('up', 'tween', .7, .8) } initial="hidden" whileInView="show" viewport={{once:"true"}}>
      <h1 className="heading">Look Around</h1>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={
            "auto"
        }
        coverflowEffect={{
          rotate: 10,
          stretch: 50,
          depth: 100,
          modifier: 5.5,
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
       {slide.map((item,index)=>{
        return(
            <>
                <SwiperSlide key={index}>
                        <img src={item.img} alt={item.title}></img>
                        <p className='slider-title'>{item.title}</p>
                </SwiperSlide>
            </>
        )
       })}

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <FaArrowAltCircleLeft/>
          </div>
          <div className="swiper-button-next slider-arrow">
            <FaArrowAltCircleRight/>
          </div>
        </div>
      </Swiper>
    </motion.div>
  );
};

export default LookAround;
