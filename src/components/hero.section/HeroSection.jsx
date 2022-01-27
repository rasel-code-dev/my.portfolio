import React from 'react';
import {Col, Row} from "src/components/UI/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import connect from "src/store/connect";
import {addData, fetchData} from "src/store/actions";
import TypeAnimation from "src/components/UI/TypeAnimation/TypeAnimation";
import classes from "./heroSection.module.scss";
import {faAngleDoubleDown} from "@fortawesome/pro-duotone-svg-icons";

import "./styles.scss"

const HeroSection = (props) => {
 
  const state = props.state
  
  return (
    <section className="section" id="hero-section" data-role="hero">
      
      <a href="#about-section">
        <div className={classes.sec_more_btn}>
          <span>Scroll bottom to see more.</span>
         <FontAwesomeIcon icon={faAngleDoubleDown} className="see_more_btn_animated"/>
        </div>
      </a>
      
      
      <div className="container">
        
        {/*<h2>{props.isFetchedData}</h2>*/}
        <div className={classes.hero_content}>
          <div className="flex items-start justify-center ">
            <div className="justify-end">
              <div className={classes["hero-avatar"]}>
                {/*<img src={fullLink(state.profile_photo)} alt="me"    />*/}
              </div>
            </div>
            <div className={"flex mt-10 flex-col items-start " + classes["hero_text--row"]}>
              <h1 className={classes['hero-section__title']}>
                I'am
                <span className="name"> Rasel Mahmud,</span>
              </h1>
              <h1 className={[classes["typing-text"], "t-50"].join(" ")}>
                <TypeAnimation texts={state.typing} />
              </h1>
              
              
              <h4 className={classes['hero-section__description']}>{state.hero_description}</h4>
              
              <div  className={"mt-50 " + classes["hero_big_button--row"]}>
                <button className="btn">Download CV</button>
                <a href="#contact-section" className="btn">Contact</a>
              </div>
            </div>
          </div>
        
        
        
        </div>
      </div>
    </section>
  );
};


export default connect(HeroSection, { fetchData });