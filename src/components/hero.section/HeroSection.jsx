import React from 'react';
import {Col, Row} from "src/components/UI/Layout";

import connect from "src/store/connect";
import {addData, fetchData} from "src/store/actions";
import TypeAnimation from "src/components/UI/TypeAnimation/TypeAnimation";
import classes from "./heroSection.module.scss";
import angle_double_down from  "src/asserts/icons/angle-double-down.svg"

const HeroSection = (props) => {
 
  const state = props.state
  
  return (
    <section className="section" id="hero-section">
      
      <a href="#about-section">
        <div className={classes.sec_more_btn}>
          <span>Scroll bottom to see more.</span>
          {/*<i className="fad fa-angle-double-down" />*/}
          <img src={angle_double_down} />
        </div>
      </a>
      
      
      <div className="container">
        
        {/*<h2>{props.isFetchedData}</h2>*/}
        <div className={classes.hero_content}>
          <Row alignItems={"flex-start"} justify={"center"}>
            <Row style={{justifyContent: "flex-end"}}>
              <div className={classes["hero-avatar"]}>
                {/*<img src={fullLink(state.profile_photo)} alt="me"    />*/}
              </div>
            </Row>
            <Row ml={20} direction={"column"} alignItems={"flex-start"} className={classes["hero_text--row"]}>
              <h1 className={classes['hero-section__title']}>
                I'am
                <span className="name"> Rasel Mahmud,</span>
              </h1>
              <h1 className={[classes["typing-text"], "t-50"].join(" ")}>
                <TypeAnimation texts={state.typing} />
              </h1>
              
              
              <h4 className={classes['hero-section__description']}>{state.hero_description}</h4>
              
              <Row mt={30} className={classes["hero_big_button--row"]}>
                <button className="btn">Download CV</button>
                <a href="#contact-section" className="btn">Contact</a>
              </Row>
            </Row>
          </Row>
        
        
        
        </div>
      </div>
    </section>
  );
};


export default connect(HeroSection, { fetchData });