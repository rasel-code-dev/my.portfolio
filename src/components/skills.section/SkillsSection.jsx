import React from 'react';
import { $, $$, isViewport } from "src/utilities/isViewport";
import OnScroll from "src/components/UI/Layout/OnScroll/OnScroll";

import classes from  './style.module.scss'

import {Row} from "src/components/UI/Layout";

const SkillsSection = (props) => {
  
  const { skills, skills_description, skills_section__subtitle } = props.state
  
  
  React.useEffect(()=> {
    animateSkillBar()
  }, [props.offsetTop])
  
  function updateInformation(value, name){
    // props.updateData({[name]: value})
  }
  
  function animateSkillBar() {
    let s = $(".skills-section")
    
    let progress = $$(".progress")
    // console.log(isViewport(s, 200))
    if (isViewport(s, 200)) {
      progress.forEach(pro => {
        let name = pro.dataset.name
        skills.forEach(s => {
          if (s.name === name) {
            pro.style.width = `${s.value}%`
            // pro.children[0].innerHTML = `${s.value}%`
          }
        })
      })
    }
  }
  
  return (
    <section className={"section skills-section " + classes["skills-section"]} id="skills-section">
      <div className="container">
        <div className="row-b mt-20">
          <h1 className="section-title">Skills</h1>
          <h6 className="sub-title t-center">{skills_section__subtitle}</h6>
        </div>
        <Row>
          <p className={classes.skill_description + " gh"}>{skills_description}</p>
        </Row>
        <div className={"row-f  mt-5 " + classes["skills-container"] + " skills-container"}>
          {skills && skills.map((skill, i) => {
            return <div className={classes.item} key={i}>
              <label>{skill.name}</label>
              <div className={classes.base}>
                <div data-name={skill.name} className={[classes.progress, "progress", `bg-${skill.color}`].join(" ")}>
                  {/*<span className="percent">0%</span>*/}
                </div>
              </div>
            </div>
          })}
        </div>
        
      </div>
      
      
    </section>
  );
};

export default OnScroll(SkillsSection, 100);