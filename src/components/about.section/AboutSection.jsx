import React from 'react';

// import {fullLink} from "src/utilities/fullLink";
import {Row,  Col} from "src/components/UI/Layout";

import Button from "src/components/UI/button2/Button";
import profile_photo from  "src/asserts/avatar/my-avatar-300x300.jpg"
import classes from  "./about.sction.module.scss"

const AboutSection = (props) => {
  
  const state = props.state
  const [selectedNav, setSelectedNav] = React.useState("About Me")
  
  function renderAboutNav(){
    function changeCategory (e){
      setSelectedNav(e.target.innerText)
    }
    const aboutNavData = ["About Me", "Skills", "Experience", "Education"]
    return aboutNavData.map(d=>(
      <Button onClick={changeCategory} className={[selectedNav === d && "active-item"].join(" ")}>
        {d}
      </Button>
    ))
  }
  
  function renderAboutMeSection(){
    return (
      <Row className={["mt-20 card", classes['about-me']].join(" ")}>
        <Col col={12} sm={12} md={12} lg={8} >
          <div className={classes["about-me-desc-para"] + " " + "sm-center"}>
            <div className={classes["middle"]}>
              <h4 className="">{state.about_title}</h4>
              <p className={classes['about_me_description']}>{state.about_description}</p>
            </div>
          </div>
        </Col>
        <Col col={12} sm={12} md={12} lg={4}>
          <div className={"col " + classes['about-me-information']}>
            <div className={classes["right"]}>
              <li>
                <span className={classes["property"]}>Age</span>
                <span className={classes["value"]}>23</span>
              </li>
              <li>
                <span className={classes["property"]}>Residence</span>
                <span className={classes["value"]}>Bangladesh</span>
              </li>
              <li>
                <span className={classes["property"]}>Address</span>
                <span className={classes["value"]}>west-tekani, Harikahli, Sonatola-Bogra (5826)</span>
              </li>
              <li>
                <span className={classes["property"]}>E-Mail</span>
                <span className={classes["value"]}>rasel@gmail.com</span>
              </li>
              <li>
                <span className={classes["property"]}>Phone</span>
                <span className={classes["value"]}>017858513535</span>
              </li>
              <li>
                <span className={classes["property"]}>Skype</span>
                <span className={classes["value"]}>rasel-mahmud</span>
              </li>
              <li>
                <span className={classes["property"]}>Freelance</span>
                <span className={classes["value"]}>Yes</span>
              </li>
      
              <div className="social">
                <a target="_blank" href={state.social_links?.twitter} className="social-icon twitter"  > <i className="fab fa-twitter" /></a>
                <a target="_blank" href={state.social_links?.facebook} className="social-icon facebook"><i className="fab fa-facebook-f" /> </a>
                <a target="_blank" href={state.social_links?.github} className="social-icon github"><i className="fab fa-github" /> </a>
                <a target="_blank" href={state.social_links?.instagram} className="social-icon instagram"><i className="fab fa-instagram" /></a>
                <a target="_blank" href={state.social_links?.youtube} className="social-icon youtube"><i className="fab fa-youtube" /></a>
                <a target="_blank" href={state.social_links?.google} className="social-icon google-plus"><i className="fab fa-google-plus-g" /> </a>
              </div>
    
            </div>
          </div>
        </Col>
      </Row>
    )
  }
  
  function renderSkillsSection(){
    return (
      <Row className="mt-20">
        <Button hover={false} prefixIcon={<i className="fab fa-html5"/>}>HTML</Button>
        <Button hover={false} prefixIcon={<i className="fab fa-css3-alt"/>}>CSS</Button>
        <Button hover={false} prefixIcon={<i className="fab fa-sass"/>}>Sass</Button>
        <Button hover={false} prefixIcon={<i className="fab fa-less"/>}>Less</Button>
        <Button hover={false} prefixIcon={<i className="fab fa-bootstrap"/>}>Bootstrap</Button>
        <Button hover={false} prefixIcon={<i className="fab fa-js"/>}>JavaScript</Button>
        <Button hover={false} prefixIcon={<i className="fab fa-google"/>}>Golang</Button>
        <Button hover={false} prefixIcon={<i className="fab fa-react"/>}>ReactJS</Button>
        <Button hover={false} prefixIcon={<i className="fab fa-vuejs"/>}>VueJS</Button>
        <Button hover={false} prefixIcon={<i className="far fa-database"/>}>MySQL</Button>
        <Button hover={false} prefixIcon={<i className="fab fa-node-js"/>}>NodeJS</Button>
        <Button hover={false} prefixIcon={<i className="far fa-database"/>}>Mongodb</Button>
        <Button hover={false} prefixIcon={<i className="far fa-database"/>}>Redis</Button>
        <Button hover={false} prefixIcon={<i className="fab fa-github"/>}>Git/Github</Button>
      </Row>
    )
  }
  
  function renderExperienceSection(){
    return (
      <Row>
        <div className="card experience education mt-20">
          <div className="card-body education-body">
            <div className="education-details">
              <i className="line-top-icon fa fa-suitcase" />
              <h4>Work at Home</h4>
              <span className="badge badge-primary mb-3">January 2018 - Running</span>
              <p>
                Concentration: Structured Programming Language, Data Structures, Javascript, Golang(Go), Software Design & Development
              </p>
            </div>
            <span className="line"></span>
          </div>
        </div>
        
  
      </Row>
    )
  }
  
  function renderEducationSection(){
    return (
      <Row>
        <div className="card education mt-20">
          <div className="card-body education-body">
            <div className="education-details">
              <i className="line-top-icon fa fa-graduation-cap" />
              <h4>B.A Honour, Government Azizul Haque College</h4>
              <span className="badge badge-primary mb-3">January 2017 - Running</span>
              <p>
                Azizul Haque College one of the most noted colleges of North Bengal located in Bogra</p>
            </div>
            <span className="line"></span>
          </div>
        </div>

      </Row>
    )
  }
  
  function renderContent() {
    if(selectedNav === "About Me"){
      return renderAboutMeSection()
    } else if(selectedNav === "Skills") {
      return renderSkillsSection()
    }else if(selectedNav === "Experience") {
      return renderExperienceSection()
    }else if(selectedNav === "Education") {
      return renderEducationSection()
    }
  }
  
  return (
    <section className="section" id="about-section">
        <div className="container">
        <div className="row-b mt-20">
          <h1 className="section-title">About Me</h1>
          <h6 className="sub-title t-center">{state.about_section__subtitle}</h6>
    
          <div className={[classes["about-me-content"],  "mt-2"].join(" ")}>
            <Row>
              <Col col={12} sm={12} md={4} lg={3} >
                <div className={[classes["cover-photo"]].join(" ")}>
                  {/*<Image src="/static/avatar/my-avatar-300x300.jpg" height={500} width={500} />*/}
                  <img src={profile_photo}/>
                </div>
              </Col>
              <Col col={12} sm={12} md={8} lg={9}>
                <div className="row-b">
                  <div className="sm-center mt-20">{renderAboutNav()}</div>
                  {renderContent()}
                </div>
              </Col>
            </Row>
    
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection