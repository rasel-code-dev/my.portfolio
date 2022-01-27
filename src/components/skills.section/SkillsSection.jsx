import React from 'react';
import { $, $$, isViewport } from "src/utilities/isViewport";
import OnScroll from "src/components/UI/Layout/OnScroll/OnScroll";

import './styles.scss'

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
  
  function renderCircleAnimatedSkills(){
    return (
      <div>
        {
          skills && skills.map((skill, i) => {
            return <div className="skill_circle_item progress-10" key={i}>
              {/*<label>{skill.name}</label>*/}
              <div className="base ">
                <div data-name={skill.name} className={["progress progress", `bg-${skill.color}`].join(" ")}>
                </div>
              </div>
            </div>
          })
        }
      </div>
    )
  }
  
  return (
    <section className="section skills-section skills-section">
      <div className="container">
        <div className="row-b mt-20">
          <h1 className="section-title">Skills</h1>
          <h6 className="sub-title text-center">{skills_section__subtitle}</h6>
        </div>
        <Row>
          <p className="skill_description  gh">{skills_description}</p>
        </Row>
        
        
        {/*<div className="row-f  mt-5 skills-container skills-container">*/}
        {/*  {renderCircleAnimatedSkills()}*/}
        {/*</div>*/}
        
        <div className="row-f  mt-5 skills-container skills-container">
          {skills && skills.map((skill, i) => {
            return <div className="item" key={i}>
              <label>{skill.name}</label>
              <div className="base">
                <div data-name={skill.name} className={["progress progress", `bg-${skill.color}`].join(" ")}>
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