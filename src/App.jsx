import React, {lazy, useState, Suspense} from 'react'
import connect from "./store/connect";
import './App.scss'


import HeroSection  from "./components/hero.section/HeroSection"
import Navigation  from "./components/navigation/Navigation"
import ProgressBar from "./components/UI/TopProgressBar/TopProgressBar";
import OnScroll from "./components/UI/Layout/OnScroll/OnScroll";

import { getBrowserId, setExpandDropdownMenu, setVisitor, toggleNavExpand} from "./store/actions";
import {isViewport} from "./utilities/isViewport";
import ReactLazyPreload from "./utilities/ReactLazyPreload";





import AboutSimple from "./components/about.section/AboutSimple";
import routes from "./routes";
const ServiceSimple = ReactLazyPreload(()=>import("./components/service.section/ServiceSimple"));
const SkillsSimple = ReactLazyPreload(()=>import("./components/skills.section/SkillsSimple"));
const ProjectSimple = ReactLazyPreload(()=>import("./components/project.section/ProjectSimple"));
const BlogSimple = ReactLazyPreload(()=>import("./components/blog.section/BlogSimple"));
const ContactSection = ReactLazyPreload(()=>import("./components/contact.section/ContactSection"));
const Footer = ReactLazyPreload(()=>import("./components/footer.section/FooterSection"));

let lastElement;

function App(props) {
  
  const { state } = props
  

  
  const [moduleRender, setModuleRender] = React.useState([])
  
  function collapseNavigationBackdrop(){
    // props.setExpandDropdownMenu("")
    // props.toggleNavExpand(false)
  }
  
  React.useEffect(()=>{
    const loader = document.querySelector(".loader")
    if(loader) {
      loader.parentElement.removeChild(loader)
    }
    let updateModuleRender = [...moduleRender]

    function getKeyByValue(object, value) {
      return Object.keys(object).find(key => object[key] === value);
    }

    setTimeout(()=>{
    
    let item = 0
      routes.forEach(async (route)=>{
        item += 1
        try {
           updateModuleRender.push(route.name)
          let res = await route.component.preload()
          if(routes.length === item){
            setModuleRender(updateModuleRender)
          }
        } catch (ex){
          // module load fails
          console.log(ex.message)
        }
      })
    }, 500)
    
    // props.setVisitor()
    // props.getBrowserId()
    
  }, [])
 
  return (
    <div className="App">
  
      <Navigation
        expandDropdownMenu={state.expandDropdownMenu}
        offsetTop={props.offsetTop.offsetTop}
      />
      
      <div onClick={collapseNavigationBackdrop} className="App_Content">
        <HeroSection />
        <Suspense fallback={<ProgressBar/>}>
          { moduleRender.indexOf("about") !== -1 && <AboutSimple state={state} /> }
          { moduleRender.indexOf("service") !== -1 && <ServiceSimple /> }
          { moduleRender.indexOf("skills") !== -1 &&  <SkillsSimple state={state} /> }
          { moduleRender.indexOf("project") !== -1 &&  <ProjectSimple /> }
          { moduleRender.indexOf("blog") !== -1 && <BlogSimple browser_id={state.browser_id} state={state} /> }
          { moduleRender.indexOf("contact") !== -1 && <ContactSection
              toggleBackdrop={state.toggleBackdrop}
              updateData={state.updateData}
              state = {{
                isAdmin: state.isAdmin,
                contact_phone: state.contact_phone,
                contact_email: state.contact_email,
                contact_address: state.contact_address
              }}
            /> }
          { moduleRender.indexOf("footer") !== -1 && <Footer/> }
          
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
