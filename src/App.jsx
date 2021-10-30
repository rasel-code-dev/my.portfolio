import React, {lazy, useState, Suspense} from 'react'
import connect from "./store/connect";
import './App.scss'


import HeroSection  from "./components/hero.section/HeroSection"
import Navigation  from "./components/navigation/Navigation"
import TopProgressBar from "./components/UI/TopProgressBar/TopProgressBar";
import OnScroll from "./components/UI/Layout/OnScroll/OnScroll";

import {getBrowserId, setExpandDropdownMenu, setVisitor, toggleNavExpand} from "./store/actions";


const AboutSection = lazy(()=>import("./components/about.section/AboutSection"));
const ServiceSection = lazy(()=>import("./components/service.section/serviceSection"));
const SkillsSection = lazy(()=>import("./components/skills.section/SkillsSection"));
const ProjectSection = lazy(()=>import("./components/project.section/ProjectSection"));
const BlogSection = lazy(()=>import("./components/blog.section/BlogSection"));
const ContactSection = lazy(()=>import("./components/contact.section/ContactSection"));
const Footer = lazy(()=>import("./components/footer.section/FooterSection"));


function App(props) {
  
  const { state } = props
  
  function collapseNavigationBackdrop(){
    props.setExpandDropdownMenu("")
    props.toggleNavExpand(false)
  }
  
  React.useEffect(()=>{
    props.setVisitor()
    
    props.getBrowserId()
    
  }, [])
  
  return (
    <div className="App">
  
      <Navigation
        expandDropdownMenu={state.expandDropdownMenu}
        offsetTop={props.offsetTop.offsetTop}
      />
      
      <div onClick={collapseNavigationBackdrop} className="App_Content">
        
        <HeroSection />
        
        <Suspense fallback={<TopProgressBar/>}>
            <AboutSection state={state} />
            <ServiceSection />
            <SkillsSection state={state} />
            <ProjectSection />
            <BlogSection browser_id={state.browser_id} />
            <ContactSection
              toggleBackdrop={state.toggleBackdrop}
              updateData={state.updateData}
              state = {{
                isAdmin: state.isAdmin,
                contact_phone: state.contact_phone,
                contact_email: state.contact_email,
                contact_address: state.contact_address
              }}
            />
          <Footer/>
          
        </Suspense>
      </div>
    </div>
  )
}

export default connect( OnScroll(App, 100), {
  getBrowserId,
  setVisitor,
  setExpandDropdownMenu,
  toggleNavExpand
})
