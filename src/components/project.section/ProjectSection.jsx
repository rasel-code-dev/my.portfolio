import React from 'react';
import {Col, MyContainer, Row} from "src/components/UI/Layout";

import classes from  "./style.module.scss"


import {fullLink} from "src/utilities/fullLink";
import Button from "src/components/UI/button2/Button";

import {$, isViewportCb} from "src/utilities/isViewport";
import {addBlur, removeBlur} from "src/store/localAction";
import Badge from "src/components/UI/badge/Badge";
import {toggleModal} from "src/store/actions";
import connect from "src/store/connect";
import Modal from "src/components/UI/Modal/Modal";



import uiThumb from "src/asserts/projects/thumbs/ui.jpg"
import ui from "src/asserts/projects/ui.jpg"
import ui3 from "src/asserts/projects/thumbs/ui3.jpg"
import dashboardThumb from "src/asserts/projects/thumbs/Ecommerce dashboard.jpg"
import typingApp from "src/asserts/projects/typing-app.png"
import linkIcon from "src/asserts/icons/link.svg"



const ProjectSection = (props) => {
  
  const { projects, isOpenModal }  = props.state
  
  const [isOpenGallery, setIsOpenGallery] = React.useState({images: [], id: ""})
  const [project, setProject] = React.useState({
    description: "",
    id: "",
    link: "",
    source_code: "",
    images: [], title: ""
  })
  
  const [myWorks, setMyWorks] = React.useState([
    {
      tags: ["E-commerce"],
      description: `
        this is multi-product and multi-vendor ecommerce website.
        it has complex product category system that can be fully control from admin dashboard.
        also it has a lot of store like mobiles, laptops, televisions,
        you can easily find any product.
      .`,
      id: "1",
      link: "",
      status: "Development",
      source_code: "",
      image: uiThumb,
      images: [
        ui,
        ui3,
        "static/projects/thumbs/2021-10-01_143750 as Smart Object-1.jpg",
        "static/projects/thumbs/2021-10-01_143845 as Smart Object-1.jpg",
      ],
      title: "Multi-Product Ecommerce",
      tools: ["ReactJS", "Typescript", "Redux", "Sass"]
    },
    {
      tags: ["E-commerce"],
      status: "Development",
      description: `
        React Ecommerce Admin Dashboard.
        Control Front-end system like UI Category, Product dropdown navigation data etc.
        Also Control All kind of Database operation, like adding, updating, deleting etc.
      `,
      id: "2",
      link: "",
      source_code: "",
      image: dashboardThumb,
      images: [
        "static/projects/Ecommerce dashboard.jpg",
      ],
      title: "Multi-Product Ecommerce Dashboard",
      tools: ["ReactJS", "Typescript", "Redux", "Sass", "NodeJS", "ExpressJS", "Mongodb"]
    },
    {
      tags: ["Web-App"],
      status: "Production",
      description: "This is type learning app. Beginner People who are not expert in hardware keyboard typing, they learn quickly typing without any hassle",
      id: "3",
      link: "https://typing-app-omega.vercel.app",
      source_code: "",
      image: typingApp,
      images: [
        "static/projects/typing-app.png"
      ],
      title: "Typing App",
      tools: ["ReactJS", "Scss"]
    }
  ])
  
  const [currentWorKCategory, setCurrentWorKCategory] = React.useState("All")
  
  const projectList  = React.useRef(null)

 
  function handleClose(){
    setIsOpenGallery({id: "", images: []})
    removeBlur("App_Content")
  }
  
  React.useEffect(()=>{
    if(projectList.current){
      let pItem = projectList.current.querySelectorAll(".project_item")
      pItem.forEach(p=>{
        isViewportCb(p, (isVi)=>{
         if(isVi){
           p.classList.add("viewport")
          p.classList.remove("outof-viewport")
         } else {
           p.classList.add("outof-viewport")
           p.classList.remove("viewport")
         }
       })
      })
    }
  }, [props.offsetTop])
  
  function renderProjectType(){
    function changeCategory (e){
      setCurrentWorKCategory(e.target.innerText)
    }
    const data = ["All", "Web-App", "E-commerce", "Corporate-Web", "Android"]
    return data.map(d=>(
      <Button onClick={changeCategory} className={[currentWorKCategory === d && "active-item"].join(" ")}>
        {d}
      </Button>
      
    ))
  }
  function closePhotoGalleryModal() {
    props.toggleModal(false)
    removeBlur("App")
  }
  
  function renderProjects(){
   
    function handleShowProjectPhotos(project) {
      props.toggleModal(true)
      addBlur("App")
      setIsOpenGallery(project)
    }
    
    function handleMouseEnter(e) {
      let image = e.target.parentElement
      let img = image.querySelector("img")
      let y = img.scrollHeight - image.offsetHeight
      img.classList.add("slow-scroll")
      img.style.transform = `translateY(-${y}px)`
    }
      function handleMouseleave(e) {
      let image = e.target
      image.style.transform = `translateY(0)`
    }
    
    let items = []
    if(currentWorKCategory !== "All") {
      myWorks.forEach(w => {
        let match = w.tags.indexOf(currentWorKCategory)
        if (match !== -1) {
          items.push(w)
        }
      })
    } else {
      items = myWorks
    }
    return items.map(work=>(
      <Col col={12} sm={6} md={6} lg={4} >
        <div className="card-2">
          <div
            onClick={()=>handleShowProjectPhotos(work)}
            onMouseLeave={handleMouseleave} onMouseEnter={handleMouseEnter} className="card-img">
              <img src={work.image} className={classes["work-image"]}  />
          </div>
          <div className="card-body">
            <h4>{work.title}</h4>
            <div className={classes["tools-uses"]}>
              {work.tools && work.tools.map(tool=>(
                <Badge theme="primary">{tool}</Badge>
              ))}
            </div>
            <p>{work.description}</p>
           
            <div className="d-flex justify-content-center align-items-center">
              <div className="d-flex align-items-center">
                { work.status === "Production" && <Button  className="m-auto" theme="transparent" href={work.link} prefixIcon={<img className={classes['project-link']} src={linkIcon}/>}>
                  Preview
                </Button> }
                <Badge theme="info" className="m-auto">
                  {work.status}
                </Badge>
              </div>
            </div>
            
          </div>
        </div>
      </Col>
    ))
  }
  
  
  return (
    <section className="section" id="project-section">
      {isOpenModal && <Modal className={classes["photo-gallery__modal"]} title={"Project Photos"} onClose={closePhotoGalleryModal}>
        <div className={classes["modal-photo_gallery__wrapper"]}>
          <div className={classes['modal-photo_gallery']}>
            {isOpenGallery && (
              isOpenGallery && isOpenGallery.images && isOpenGallery.images.map(img => (
                img && <div className={classes['modal-photo_gallery__item']}>
                  <img src={img}  />
                </div>
              ))
            )
            }
          </div>
        </div>
      </Modal>
      }
      <div className="container">
        <div className="row-b mt-20">
          <h1 className="section-title">Recent Work</h1>
          <h6 className="sub-title t-center">My Projects</h6>
        </div>
        
        <div className="row justify-content-center mt-2">
          {renderProjectType()}
        </div>
        
       {/* <div className="row-b">
          <div className="work-nav">
            <li className="work-nav__nav-item">Graphic Design</li>
            <li className="work-nav__nav-item active">Web Design</li>
            <li className="work-nav__nav-item">Software</li>
            <li className="work-nav__nav-item">Apps</li>
          </div>
        </div>*/}
       
        {/* Gallery Modal */}
        {/*{ isOpenGallery !== -1 && (*/}
        {/*    <Modal className="full-modal" style={{top: '60px'}} title={project.title + " Photos Preview"} onClose={handleClose}>*/}
        {/*       <Container>*/}
        {/*          <Gallery images={project.images}/>*/}
        {/*       </Container>*/}
        {/*    </Modal>*/}
        {/*  )*/}
        {/*}*/}
        
        <div className={classes['project_list']}>
          <Row>
           {renderProjects()}
          </Row>
          
          <Row justify="center">
            {/*<Button suffixIcon={<i className="fad fa-angle-double-right"/>}>View all</Button>*/}
          </Row>
        </div>
        
        
        {/*<div ref={projectList} className="card-wrapper mt-4 work-gallery">
          { projects && projects.map((project, i)=>(
            <div  className={["project_item", i % 2 ? "right" : "left"].join(" ")}>
                <Box className="image-box" >
                  <div className="project-image">
                    <img onClick={(e)=> showGalleryHandler(project.id)} src={fullLink(project.images[0] && project.images[0].hd)} alt={project.title}/>
                  </div>
                </Box>
                <Box className="content-box" ml={10}>
                  <h1 onClick={(e)=> showGalleryHandler(project.id)} className="para-title">{project.title}</h1>
                  <h5 >My Personal</h5>
                  <p className="para-text">{project.description}</p>
                    <div className="project-other-links">
                      <i className="fas fa-globe"/>
                      <i className="fab fa-github"/>
                      <i className="fas fa-download"/>
                    </div>
                </Box>
                
            </div>
            
            // <div className="card-2 project-item">
            //   <div className="work" onClick={(e)=> showGalleryHandler(project.id)}>
            //     <MouseOnScroll src={project.images && project.images[0]}  />
            //     <div className="box">
            //       <img src={fullLink(project.images[0] && project.images[0].hd)} alt=""/>
            //     </div>
            //   </div>
            //
            //   <div className="row-b">
            //     <h4 className="t-title t-center">{project.title}</h4>
            //     <p  className="t-para t-center">{project.description}</p>
            //   </div>
            //
            //   <div className="row-f justify-content-center mt-4">
            //     { project.link ? <Button><a href={project.link}>Visit Site</a></Button> : "" }
            //     <Button> <a href={project.source_code}>Source Code</a></Button>
            //   </div>
            // </div>
          ))}
        </div>*/}
  
        {/*<Pagination*/}
        {/*  className="mt-5"*/}
        {/*  pages={3}*/}
        {/*  currentPage={1}*/}
        {/*  perPageShow={5}*/}
        {/*  changePageNum={1}*/}
        {/*  totalProduct={10}*/}
        {/*/>*/}
  

      </div>
    </section>
  );
};

export default connect(ProjectSection,{toggleModal})