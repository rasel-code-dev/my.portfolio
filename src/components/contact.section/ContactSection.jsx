import React from 'react';

import axiosInstance from "src/apis/axiosInstance";
import Input from "src/components/UI/Form/Input";
import Button from "src/components/UI/Button/Button";
import Modal from "src/components/UI/Modal/Modal";
import {Col, Row} from 'src/components/UI/Layout';
import OnScroll from "src/components/UI/Layout/OnScroll/OnScroll";
import {isViewportCb} from "src/utilities/isViewport";

import envelopeIcon from "src/asserts/icons/envelope-open.svg"
import mapIcon from "src/asserts/icons/map-marked-alt.svg"
import commentIcon from "src/asserts/icons/comment-alt-lines.svg"



import classes from  "./style.module.scss"
import SocialLinks from "../socialLinks/SocialLinks";

let visitCount = true

const ContactSection = (props) => {
  
  const { social_links } = {
    ...props.state,
    social_links: {
      facebook: "https://www.facebook.com/raselmraju",
      twitter: "",
      instagram: "",
      google: "",
      youtube: "dsf",
      linkedin: "https://www.linkedin.com/in/rasel-code-dev",
      github: "https://github.com/rasel-code-dev"
    },
  }
  
  const [message, setMessage] = React.useState({
    name: '',
    from: '',
    subject: '',
    text: ''
  })
  const [visitors, setVisitors] = React.useState({today: 0, total: 0})
  const [isComplete, setIsComplete] = React.useState(false)
  const [sendMessage, setSendMessage] = React.useState({ message: "", success: false })
  const [isSendMessage, setIsSendMessage] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const contactSection = React.useRef(null)
  
  React.useEffect(()=>{
    axiosInstance.get("/api/visitor").then(response=>{
      if(response.data) {
        setVisitors({...response.data})
        visitCount = true
      }
    })
  }, [])
  

  function sendMailHandler(){
    if(message.from === "" || message.text === "" || message.name === ""){
      setIsComplete(false)
    } else{
      // props.toggleBackdrop(true)
      setIsLoading(true)
      setIsSendMessage(false)
      axiosInstance.post("/api/mail", {...message}).then(r => {
        if(r.status >= 200 && r.status < 400){
          setSendMessage({ message: r.data.message, success: true})
          setIsLoading(false)
          setIsSendMessage(true)
          setTimeout(()=> {
            setIsSendMessage(false)
          }, 1000)
        }
      }).catch(err=>{
          setSendMessage({ message: err.response.data.message, success: false})
          setIsLoading(false)
          setIsSendMessage(true)
      })
    }
  }
  function handleChange(e){
    const { name, value } = e.target
    let val = {
      ...message, [name]: value
    }
    
    setMessage(val)
    if(message.from === "" || message.text === "" || message.name === ""){
      setIsComplete(false)
    } else {
      setIsComplete(true)
    }
  }
  function handleClose(){
    setIsSendMessage(false)
    props.toggleBackdrop(false)
  }
  
  return (
    <section className="section" id="contact-section" data-role="contact" ref={contactSection}>
      {
        isSendMessage &&
        <Modal title={sendMessage.message} children={()=><h1>dfs</h1>} onClose={handleClose}/>
      }
      <div className="container">
        
        <div className="row-b mt-20">
          <h1 className="section-title">Contact Me</h1>
          <h6 className="sub-title text-center ">GET IN TOUCH</h6>
          <div className="row-b mt-3">
            {/*{ sendMessage.message !== "" && <h5 className={["popup-message text-center", sendMessage.success ? "success" : "error"].join(" ")}>{sendMessage.message}</h5> }*/}
        </div>
          
        </div>
  
        <div className={"mt-5 " + classes["contact-form-wrapper-row"] }>
          <div className="flex w-full flex-col md:flex-row">
            <div className={"flex-2 mr-2 " + classes["social-contact"]}>
              <div className={classes["social-contact__item"]}>
                <div>
                  <label className={classes.label}>Quick Contact</label>
                  <span className={classes["contact-value"]}>
                      Don't like forms? Send me an <a href="https://mail.google.com/mail/?view=cm&fs=1&to=raselmr005@gmail.com&cc=raselmr005@gmail.com&su=Need%20to%20disscuss%20with%20Mr.%20Rasel&body=Hello,%20I%20need%20to%20talk">email</a>.
                    </span>
                </div>
              </div>
      
              <div className={classes["social-contact__item"]}>
                <div className={classes.icon}>
                  <img src={envelopeIcon} />
                  {/*<i className="fad fa-envelope-open" />*/}
                </div>
                <div>
                  <label className={classes.label}>Email</label>
                  <span className={classes["contact-value"]}>rasel@gmail.com</span>
                </div>
              </div>
      
              <div className={classes["social-contact__item"]}>
                <div className={classes.icon}>
                  <img src={mapIcon} />
                  {/*<i className="fad fa-map-marked-alt"/>*/}
                </div>
                <div>
                  <label className={classes.label}>Location</label>
                  <span className={classes["contact-value"]}>Sonatola, Bogra</span>
                </div>
              </div>
      
              <div className={classes["social-contact__item"]}>
                <div className={classes.icon}>
                  <img src={commentIcon} />
                  {/*<i className="fad fa-comment-alt-lines"/>*/}
                </div>
                <div>
                  <label className={classes.label}>Social Media</label>
                  <SocialLinks social_links={social_links} />
                </div>
              </div>
    
            </div>
            <div className={classes["contact-form"] + " flex-4"}>
              <Input
                type="text"
                id="name"
                name="name"
                required={true}
                label="Your name"
                value={message.name}
                placeholder="Your name"
                onChange={handleChange}
              />
              <Input
                type={"email"}
                id="email"
                name="from"
                required={true}
                label="Your Email"
                placeholder="Your Email"
                value={message.from}
                onChange={handleChange}
              />
              <Input
                type="text"
                id="subject"
                name="subject"
                label="Subject"
                placeholder="Subject"
                value={message.subject}
                onChange={handleChange}
              />
              <Input
                as="textarea"
                label="Enter Your Message"
                id="message"
                minHeight={150}
                required={true}
                placeholder="Message"
                value={message.text}
                name="text"
                onChange={handleChange}
              />
        
              <div className="form-group m-0">
                <Button loadingText={"Message Sending..."} isLoading={isLoading} disabled={!isComplete || !!isLoading}  onClick={sendMailHandler} >Send Message</Button>
              </div>
      
            </div>
          </div>
        </div>
      
        <div className={"card-2 " + classes["visitor-row--wrapper"]}>
          <h1 className={"text-center " + classes["visitor-text"]}>Visitors</h1>
  
          <div className={"flex " + classes["visitor-row"]}>
    
            <div className={classes["visit_box"]}>
              <h1 className={classes["count-title"]}>Today</h1>
              <h1 className={classes.count}>{visitors.today ? visitors.today : 0}</h1>
            </div>
    
            <div className={classes.visit_box}>
              <h1 className={classes["count-title"]}>Total</h1>
              <h1 className={classes.count}>{visitors.total ? visitors.total : 0}</h1>
            </div>
  
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default OnScroll(ContactSection, 400);