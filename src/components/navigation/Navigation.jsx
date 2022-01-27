import React from 'react';
import { withWidth} from 'src/components/UI/Layout';
import classes from "./navigation.module.scss"
import {$, $$, isViewportCb} from "src/utilities/isViewport";

import connect from "src/store/connect"
import {loginAsAdmin, adminLogout, toggleBackdrop, toggleNavExpand, setExpandDropdownMenu} from "src/store/actions"
import fullLink from "src/utilities/fullLink";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {addBlur, removeBlur} from "../../store/localAction";
import {faBars, faMoon, faUserCircle} from "@fortawesome/pro-solid-svg-icons";
import {faAngleUp, faSignIn} from "@fortawesome/pro-regular-svg-icons";
import {faPalette, faSun} from "@fortawesome/free-solid-svg-icons";

let brand_logo = `
<svg width="100px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 534.35 145.6"><defs><style>.cls-1{fill:url(#linear-gradient);}.cls-2{fill:url(#linear-gradient-2);}.cls-3{fill:url(#linear-gradient-3);}.cls-4{fill:url(#linear-gradient-4);}.cls-5{fill:url(#linear-gradient-5);}.cls-6{fill:url(#linear-gradient-6);}.cls-7{fill:url(#linear-gradient-7);}</style><linearGradient id="linear-gradient" x1="114.74" y1="72.92" x2="356.19" y2="72.92" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0075bd"/><stop offset="0.07" stop-color="#0678be"/><stop offset="0.16" stop-color="#1681c3"/><stop offset="0.26" stop-color="#308fc9"/><stop offset="0.36" stop-color="#55a3d3"/><stop offset="0.48" stop-color="#84bcdf"/><stop offset="0.59" stop-color="#bddbee"/><stop offset="0.71" stop-color="#fff"/></linearGradient><linearGradient id="linear-gradient-2" x1="249.3" y1="20.7" x2="382.99" y2="20.7" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0075bd"/><stop offset="0.09" stop-color="#0578be"/><stop offset="0.2" stop-color="#1580c2"/><stop offset="0.32" stop-color="#2e8ec9"/><stop offset="0.44" stop-color="#51a1d2"/><stop offset="0.58" stop-color="#7fbade"/><stop offset="0.72" stop-color="#b6d8ec"/><stop offset="0.86" stop-color="#f6fafd"/><stop offset="0.88" stop-color="#fff"/></linearGradient><linearGradient id="linear-gradient-3" x1="252.01" y1="92.84" x2="399.45" y2="92.84" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0075bd"/><stop offset="0.09" stop-color="#0678be"/><stop offset="0.2" stop-color="#1681c3"/><stop offset="0.32" stop-color="#3190ca"/><stop offset="0.46" stop-color="#57a4d4"/><stop offset="0.61" stop-color="#88bfe0"/><stop offset="0.76" stop-color="#c3deef"/><stop offset="0.9" stop-color="#fff"/></linearGradient><linearGradient id="linear-gradient-4" x1="453.39" y1="73" x2="538.59" y2="73" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0075bd"/><stop offset="0.09" stop-color="#1a83c4"/><stop offset="0.43" stop-color="#7bb7dd"/><stop offset="0.7" stop-color="#c2deef"/><stop offset="0.9" stop-color="#eef6fb"/><stop offset="1" stop-color="#fff"/></linearGradient><linearGradient id="linear-gradient-5" x1="345.8" y1="87.61" x2="471.23" y2="87.61" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0075bd"/><stop offset="0.1" stop-color="#0678be"/><stop offset="0.22" stop-color="#1581c3"/><stop offset="0.36" stop-color="#308fc9"/><stop offset="0.51" stop-color="#54a3d3"/><stop offset="0.67" stop-color="#83bcdf"/><stop offset="0.83" stop-color="#bddbee"/><stop offset="1" stop-color="#fff"/></linearGradient><linearGradient id="linear-gradient-6" x1="346.86" y1="10.7" x2="469.82" y2="10.7" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0075bd"/><stop offset="0.09" stop-color="#0678bf"/><stop offset="0.22" stop-color="#1882c3"/><stop offset="0.36" stop-color="#3491cb"/><stop offset="0.52" stop-color="#5ca7d5"/><stop offset="0.69" stop-color="#90c3e2"/><stop offset="0.87" stop-color="#cde4f2"/><stop offset="1" stop-color="#fff"/></linearGradient><linearGradient id="linear-gradient-7" y1="73.3" x2="489.24" y2="73.3" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0075bd"/><stop offset="0.04" stop-color="#0477be"/><stop offset="0.08" stop-color="#0f7dc1"/><stop offset="0.11" stop-color="#2287c6"/><stop offset="0.15" stop-color="#3c96cd"/><stop offset="0.18" stop-color="#5ea8d5"/><stop offset="0.22" stop-color="#88bfe0"/><stop offset="0.25" stop-color="#bad9ed"/><stop offset="0.28" stop-color="#f1f8fc"/><stop offset="0.29" stop-color="#fff"/></linearGradient></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M191.2,2.42H174.12L163.86,26.8h18.61l-.13.35.13-.33,25.2,64.6h-51.4L177.1,40.06l-18.64-.45L114.74,143.42H135.4l14.23-35H213.9l13.64,35H248.2Z"/><path class="cls-2" d="M274,26.8v1.41a21.65,21.65,0,0,1,3.8-4.31q7.4-6.49,19.6-6.5,23.79,0,28.4,24l17.8-3q-2.2-18-14.3-28.2T298,0a54.27,54.27,0,0,0-24.6,5.4,42.54,42.54,0,0,0-17,14.9,37.47,37.47,0,0,0-3.37,6.5Z"/><path class="cls-3" d="M339.83,85A34.43,34.43,0,0,0,325,73.4a128,128,0,0,0-22.8-7.2q-16.61-3.6-24.2-8.9T270.43,41c0-.31,0-.62,0-.93H250.29c0,.64-.06,1.28-.06,1.93q0,13.61,5.4,21.5a35.34,35.34,0,0,0,15.3,12.3,133.41,133.41,0,0,0,23.5,7.6q15.6,3.81,23,8.3t7.4,14.3q0,10.41-7.7,16.3T296,128.2q-16.2,0-24.7-7t-10.9-22l-19,2.6q4.59,43.8,53.4,43.8,14.79,0,26.1-5.1a42.37,42.37,0,0,0,17.7-14.2,35.81,35.81,0,0,0,6.4-21.1Q345,92.41,339.83,85Z"/><path class="cls-4" d="M449.15,144V2h20.2V126.4h65l-1.6,17.6Z"/><polygon class="cls-5" points="372.66 126.6 372.66 80.8 436.86 80.8 436.86 63.4 372.66 63.4 372.66 31.22 352.86 31.22 352.86 144 440.26 144 441.86 126.6 372.66 126.6"/><polygon class="cls-6" points="372.66 19.4 439.26 19.4 439.26 2 352.86 2 352.86 19.4 372.66 19.4"/><path class="cls-7" d="M106.8,124a21.29,21.29,0,0,1-11.4,3.2q-6.6,0-10.5-2.5T76,114.6L60.8,92.2q-5.4-7.8-11-10.8A62.34,62.34,0,0,0,72,76,37.47,37.47,0,0,0,87.8,62.8q5.81-8.59,5.8-21.2,0-18.6-13.2-29.3T41.8,1.6H0V18.2H40.4q16.8,0,25,6.2T73.6,42q0,12.41-8.9,18.1T38.8,65.8h-19V30.51L0,30.17V143.6H19.8V81.8H23q7.8,0,13.8,9l23.8,35.6q6.6,10,14.4,14.3A35.4,35.4,0,0,0,92.4,145q12,0,19-5.4Z"/></g></g></svg>
`

const Navigation = (props) => {
  
  const [responsive, setResponsive] = React.useState("desktop")
  
  const [mobileNavHeight, setMobileNavHeight] = React.useState(0)
  const mobileNavRef = React.useRef(null)
  const floatingButtonRef = React.useRef(null)
  
  const [themeMode, setThemeMode] = React.useState("day")
  const [ isOpenModal, setIsOpenModal ] = React.useState(false)
  const [ form, setForm ] = React.useState({ admin_email: "", admin_password: "" })
  
  
  
  let removeBlurTimeID;
  
  function handleNavExpandToggler(){
    props.toggleNavExpand(!props.state.isNavExpand)
    setMobileNavHeight(mobileNavRef.current.scrollHeight)
  }
  
  const navPath = [
    {path: "#hero-section", name: "Home"},
    {path: "#about-section", name: "About Me"},
    {path: "#service-section", name: "Services"},
    {path: "#skills-section", name: "Skills"},
    {path: "#project-section", name: "Works"},
    {path: "#blog-section", name: "Blogs"},
    {path: "#contact-section", name: "Contact Me"}
  ]
  const [currentHash, setHash] = React.useState("#hero-section")
  
  React.useEffect(()=>{
    if(props.innerWidth > 576) {
      if(props.innerWidth < 860){
        setResponsive("tablet")
      } else{
        setResponsive("desktop")
      }
    } else if(props.innerWidth <= 575){
      setResponsive("mobile")
    }
  }, [props.innerWidth])
  
  
  React.useEffect(()=>{
    if(typeof window !== "undefined"){
      window.location.hash && setHash(window.location.hash)
    }
  }, [typeof window !== "undefined" ? window.location.hash: []])
  
  
  
  React.useEffect(()=>{

    if(props.offsetTop > 1000){
      floatingButtonRef.current.classList.add(classes['show-floating-btn'])
    } else{
      floatingButtonRef.current.classList.remove(classes['show-floating-btn'])
    }

    const navigation = $(`.${classes.navigation}`)

    if(props.offsetTop >= (window.innerHeight - 100)){
      navigation.classList.remove(classes['transparent-bg'])
      navigation.classList.add(classes['nav_floating'])
    } else{
      navigation.classList.add(classes['transparent-bg'])
      navigation.classList.remove(classes['nav_floating'])
    }

    // set location hash when change each section
    if(props.offsetTop <= 300){
      setHash(`#hero-section`)

    } else {
      const allSections = $$(".section")
      allSections.forEach(item => {
        isViewportCb(item, (isViewport) => {
          if (isViewport) {
            setHash(`#${item.id}`)
          }
        })

      })
    }

  }, [props.offsetTop])
  
  
  React.useEffect(()=>{
    // let theme = localStorage.getItem("theme")
    // setTheme(false, theme)
    // setThemeMode(theme)
    //
    // setNavActive()
    // window.addEventListener("popstate", setNavActive)
    // return ()=>{
    //   window.removeEventListener("popstate", setNavActive)
    // }
  }, [])
  
  function setTheme(e, themeName){
    let tColor = $("#theme-color")
    
    if(themeName){
      let html = document.querySelector("html")
      if(themeName === "light"){
        localStorage.setItem("theme", "light")
        if(tColor) tColor.content = "#ff9a9a"
        html.setAttribute("data-color-mode", "light")
        if(e){
          e.target.setAttribute("data-theme", "dark")
        }
        // e.target.firstChild.classList.replace("fa-sun", "fa-moon")
      } else if(themeName === "dark") {
        if(tColor) tColor.content = "#3c3c3c"
        localStorage.setItem("theme", "dark")
        html.setAttribute("data-color-mode", "dark")
        // console.log(html, themeName)
        if(e){
          e.target.setAttribute("data-theme", "light")
          e.target.firstChild.classList.replace("fa-moon", "fa-sun")
        }
      } else{
        // console.log('computed from date time')
        localStorage.setItem("theme", "auto")
        if(idNight()){
          html.setAttribute("data-color-mode", "dark")
          if(tColor) tColor.content = "#3c3c3c"
        } else{
          html.setAttribute("data-color-mode", "light")
          if(tColor) tColor.content = "#ff9a9a"
        }
      }
    }
  }
  
  
  function switchTheme(themeName){
    setTheme(null, themeName)
    setThemeMode(themeName)
  }
  
  function idNight(){
    let d = new Date()
    
    let h = d.getHours()
    let isNight = true
    if(h >= 6 && h <= 18 ){ //  6AM to 5.59 PM as a day
      isNight = false
    }
    return isNight
  }
  
  function setBreakPoint(){
    return classes[responsive + "-mode"]
  }
  
  function adminLogout(){
    // props.adminLogout(router.push)
  }
  
  let isAdmin = false
  
  function openModal(){
    setIsOpenModal(true)
    props.setExpandDropdownMenu("")
    addBlur("App")
  }
  
  
  async function goAdminPage(e){
    e.preventDefault()
    if(form.admin_email !== "" && form.admin_password !== ""){
      // props.loginAsAdmin(form, router.push, setIsOpenModal)
    }
  }
  function closeModal(){
    setIsOpenModal(false)
    props.setExpandDropdownMenu("")
    removeBlur("App")
  }
  function onChange(e){
    // setForm({...form, [e.target.name]: e.target.value})
  }
  
  
  return (
    <div className={classes.navigation}>
      {/*{ isOpenModal && <LoginModal form={form} onChange={onChange} onSubmit={goAdminPage} onClose={closeModal}/> }*/}
      <div className="container">
        <div className={classes["nav-container"]}>
          <nav className={[classes.navbar, "items-center", setBreakPoint() ].join(" ")}>
            
            <div className={[classes["hamburger-nav"], themeMode ==="dark" && "white-color"].join(" ")}>
              <FontAwesomeIcon icon={faBars} onClick={handleNavExpandToggler} />
            </div>
            
            <div className={classes["logo-nav"]}>
              <a href="/">
                <div className={classes['brand_logo']} dangerouslySetInnerHTML={{__html: brand_logo}}/>
              </a>
            </div>
            
            <div
              ref={mobileNavRef}
              className={ [classes['main-nav'],
                props.state.isNavExpand
                  ? classes['expand_nav']
                  : classes['collapse_nav'],
                  themeMode === "dark" && "dark-mode"].join(" ")
                }
              style={{height: mobileNavHeight + 30+ "px"}}
            >
              <ul className={classes['main_nav__ul']}>
                {navPath.map(np=>(
                  <li className={classes['nav-item']}>
                    <a
                      className={[classes.nav_link, currentHash === np.path ? classes["active-nav"] : ""].join(" ")}
                      href={np.path}>{np.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className={[classes['auth-nav'], "d-flex align-items-center"].join(" ")}>
              <li onClick={()=>props.setExpandDropdownMenu("auth_menu")} className={classes["nav-item"] + " " + classes.icon}>
                { props.state.isAdmin
                  ? (
                    <img className={classes['auth_avatar']} src={fullLink(props.state.profile_photo)} alt={props.state.profile_photo} />
                  ) : (
                    <FontAwesomeIcon icon={faUserCircle}  />
                  )
                }
                <ul className={[classes['theme_chooser'], classes['auth-menu'],
                  props.expandDropdownMenu === classes.auth_menu ? classes.show_theme_chooser : ""].join(" ")}>
                  {props.state.isAdmin ?
                    <>
                      <li onClick={adminLogout}><i className="fa fa-sign-out"/><span>SignOut</span></li>
                      <li className={classes["nav-item"]}>
                        <FontAwesomeIcon icon={faUserCircle}  />
                        <a href="/admin/dashboard">Dashboard</a>
                      </li>
                    </>
                    :
                    <li onClick={openModal}>
                      <FontAwesomeIcon icon={faSignIn}  />
                      {/*<i className="fa fa-sign-in"/>*/}
                      <span>Admin Login</span></li>
                  }
                </ul>
              </li>
              <li onClick={()=>props.setExpandDropdownMenu("theme_chooser")} className={[classes["nav-item"],  classes.icon].join(" ")}>
                {/*<i className="fas fa-palette" />*/}
                <FontAwesomeIcon icon={faPalette} />
                <ul className={[classes.theme_chooser, props.expandDropdownMenu === classes.theme_chooser ?  classes.show_theme_chooser : ""].join(" ")}>
                  <li  onClick={()=>switchTheme("light")} data-theme="light" className={[themeMode === "light" ? classes["active-theme-mode"]: ""].join(" ")}>
                    <FontAwesomeIcon icon={faSun} />
                    <span>Day</span>
                  </li>
                  <li onClick={()=>switchTheme("dark")} data-theme="dark" className={[themeMode === "dark" ? classes["active-theme-mode"]: ""].join(" ")}>
                   
                    <FontAwesomeIcon icon={faMoon} />
                    <span>Night </span>
                  </li>
                  <li  onClick={()=>switchTheme("auto")} data-theme="auto" className={[themeMode === "auto" ? classes["active-theme-mode"]: ""].join(" ")}>Auto</li>
                </ul>
              </li>
            </div>
          </nav>
        </div>
        <a ref={floatingButtonRef} className={classes["floating-button"] + " btn"}  href="#hero-section">
          <FontAwesomeIcon icon={faAngleUp} />
          {/*<img src={angleUpIcon} />*/}
        </a>
      </div>
    </div>
  );
};


export default connect(withWidth(Navigation),  {setExpandDropdownMenu, loginAsAdmin, adminLogout, toggleBackdrop, toggleNavExpand});