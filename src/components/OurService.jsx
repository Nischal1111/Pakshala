import React, { useEffect, useRef, useState } from 'react';
import "../Css/About.css";
import Card from '@mui/material/Card';
import {fadeIn} from "../motion/motion"
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import {SectionWrapper} from "../motion/index"

const ServiceCard = ({ item,index }) => {
    return (
        <motion.Card className='service-card' 
            style={{backgroundColor:"#F3EEEA",position:"relative"}} 
            variants={fadeIn("up","spring",index*0.25,1.25,3)} 
            viewport={{once:"true"}}
            initial="hidden"
            whileInView="show">
            <CardMedia
                component="img"
                alt={item.name}
                image={item.imgSrc}
                className='service-img'
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={{fontFamily:"Lato",fontSize:"2rem",letterSpacing:"3px",margin:"1rem 0rem"}}>
                    {item.name}
                </Typography>
                <Typography variant="body2" style={{fontFamily:"Lato",fontSize:"1.2rem",letterSpacing:"1.4px",color:"black",lineHeight:"2rem"}}>
                    {item.description}
                </Typography>
            </CardContent>
            <CardActions >
                <Button style={{fontSize: "1.4rem",border: "1px solid white",background: "#C7C8CC",padding: ".7rem 35px",color:"white",bottom:"0px",width:"30%",textTransform:"capitalize"}}>{item.button}</Button>
            </CardActions>
        </motion.Card>
    );
};

const OurService = () => {
    const services = [
        {
            id: 1,
            imgSrc: "https://images.unsplash.com/photo-1613946069412-38f7f1ff0b65?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRpbmluZ3xlbnwwfHwwfHx8MA%3D%3D",
            name: "Restaurant",
            description: "Our restaurant offers an unparalleled dining experience with a variety of delicious dishes prepared by our expert chefs. Using only the freshest ingredients, our culinary team crafts meals that are both flavorful and visually stunning.",
            button: "View"
        },
        {
            id: 2,
            imgSrc: "https://images.unsplash.com/photo-1574966739987-65e38db0f7ce?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            name: "Dining",
            description: "Experience exquisite dining at its finest with our carefully curated menu that caters to all tastes. Our dining venue provides a sophisticated atmosphere where you can enjoy a wide range of culinary delights.",
            button: "View"
        },
        {
            id: 3,
            imgSrc: "https://images.pexels.com/photos/8685540/pexels-photo-8685540.jpeg?auto=compress&cs=tinysrgb&w=800",
            name: "Rooftop Dining",
            description: "Dine under the stars and enjoy a stunning view of the city skyline with our rooftop dining experience. This unique setting combines breathtaking vistas with exceptional cuisine to create an unforgettable evening.",
            button: "View"
        },
        {
            id: 4,
            imgSrc: "https://images.unsplash.com/photo-1620735692151-26a7e0748429?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZXZlbnQlMjB2ZW51ZXxlbnwwfHwwfHx8MA%3D%3D",
            name: "Event Venue",
            description: "Host your special events in our spacious and elegant venue, designed to accommodate a variety of occasions. From weddings and corporate events to private parties and celebrations, our venue offers a versatile space that can be tailored to your specific needs. ",
            button: "View"
        },
        {
            id: 5,
            imgSrc: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm9vbXxlbnwwfHwwfHx8MA%3D%3D",
            name: "Rooms and Reservation",
            description: "Book a comfortable stay with our luxurious rooms and convenient reservation system. Our accommodations offer a blend of elegance and comfort, providing a relaxing retreat for both business and leisure travelers. Each room is tastefully decorated and equipped.",
            button: "View"
        },
        {
            id: 6,
            imgSrc: "https://images.pexels.com/photos/3846131/pexels-photo-3846131.jpeg?auto=compress&cs=tinysrgb&w=800",
            name: "Takeaways",
            description: "Order your favorite meals to go and enjoy them at your convenience with our takeaway service. We offer a wide selection of dishes that are perfect for enjoying at home, at the office, or on the go",
            button: "Order"
        }
    ];

    // const [currentIndex, setCurrentIndex] = useState(0);
    // const ref = useRef(null);

    // const numSlides = Math.ceil(services.length / 3);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCurrentIndex(prevIndex => (prevIndex + 1) % numSlides);
    //     }, 4500);

    //     return () => clearInterval(interval);
    // }, [numSlides]);

    // useEffect(() => {
    //     const cardWidth = ref.current.children[0].clientWidth + 55;
    //     const translateX = -currentIndex * (cardWidth * 3);
    //     ref.current.style.transform = `translateX(${translateX}px)`;
    // }, [currentIndex]);

    return (
        <div className='service'>
            <div className="service-allcards" >
                {services.map((item, index) => (
                    <ServiceCard key={index} item={item} index={index}/>
                ))}
            </div>
        </div>
    );
};

export default SectionWrapper(OurService,"");
