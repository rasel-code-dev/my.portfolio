import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import code from  "src/asserts/icons/code.svg"
import brackets from  "src/asserts/icons/brackets-curly.svg"
import tachometer from  "src/asserts/icons/tachometer-alt.svg"
import analytics from  "src/asserts/icons/analytics.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {addBlur, removeBlur} from "../../store/localAction";
import {faBars, faMoon, faUserCircle} from "@fortawesome/pro-solid-svg-icons";

import fullLink  from 'src/utilities/fullLink';
import classes from "./style.module.scss";

const ServiceSection = (props) => {
  
  const state = {
    ...props.state,
    services_subtitle: "I provides these services "
  }
  
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    button: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  }
  
  const services = [
    {
      logo: code,
      title: "Web Design",
      // desc: "Modern web design is more involved than creating an attractive website. Consideration of user experience.",
      desc: "Front End Development is building the visual components of a website. Using HTML, CSS, and Javascript, I build fast, interactive websites.",
    },
    {
      logo: brackets,
      title: "Web Development",
      desc: "From simple to complex, i will create, host, and update the site for you.",
    },
    {
      logo: tachometer,
      title: "Speed Optimization",
      desc: "I also provide speed optimization service plans that can help your website load at top speeds.",
      
    },
    {
      logo: analytics,
      title: "Seo",
      desc: "SEO is one of the best online marketing strategies to help your business improve and growth its online presence.",
      
    }
]
  
  return (
    <section className="section">
      <div className="container">
        <div className="row-b mt-20">
        <h1 className="section-title">What I Do</h1>
        
         <h6 className="sub-title t-center">{state.services_subtitle}</h6>
        </div>
        <div className={classes['services-content'] + " mt-30"}>
          <Slider {...settings}>
            {services && services.map(service=>(
              <div style={{margin: "5px", background: "red"}}>
                <div className={classes.service + " card-2"}>
                  <div className={classes['service-img']}>
                    {/*<i className={service.logo} />*/}
                    <img src={service.logo} alt={service.logo} />
                  </div>
                  <h4>{service.title}</h4>
                  <p>{service.desc}</p>
                </div>
              </div>
            )) }
          </Slider>
        </div>
        
      </div>
    </section>
  );
};


export default ServiceSection