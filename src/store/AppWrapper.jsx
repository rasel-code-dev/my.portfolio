import React, {useContext, createContext} from "react";

export const MyContext = createContext({})

export function useAppContext() {
  return useContext(MyContext);
}

/**
 * it just context AppWrapper wrapper and extra function state shared that contains reactive state
 * */

function AppWrapper(props){
  const [state, setState] = React.useState({
    isFetchedData: false,
    isOpenBackdrop: false,
    isOpenModal: false,
    toggleLoading: false,
    hero_title: "I'm Rasel Mahmud.",
    typing: ["Web Designer", "Web Developer"],
    hero_description: "I am a  Front End  and Backend Web Developer living in Bogra Bangladesh.\nAlso I am a ardent learner who always making new awesome stuff. ",
    name: 'rasel',
    email: 'rasel@gmail.com',
    profile_photo: 'static/avatar/my-avatar-300x300.jpg',
    services: [Array],
    contact_phone: '+8801785513535',
    contact_email: 'rasel@gmail.com',
    contact_address: 'West-tekani, Harikhali-5826, Sonatola-Bogra',
    isNavExpand: false,
    message: "",
    visitors: [],
    browser_id: "34534545",
    expandDropdownMenu: "",
    about_title: 'Hi, This is RaseL.',
    // about_title: 'I am a Web Developer.',
    about_section__subtitle: "a little description about me",
    about_description: "A Passionate Web Developer. I worked varies projects with modern technologies like javascript, react, node js, golang.\n" +
      "Most of my time I design and build digital products.\n" +
      "I prefer to keep learning, continue challenging myself,\n" +
      "and do interesting things that matter. \n" +
      "\n" +
      "I’m a people-person with deep emotions and empathy, \n" +
      "a natural storyteller. \n" +
      "I’m able to inspire and am at my best when I’m\n" +
      "sharing my creative expressions with others.",
    social_links: {
      facebook: "https://www.facebook.com/raselmraju",
      twitter: "",
      instagram: "",
      google: "",
      youtube: "dsf",
      linkedin: "https://www.linkedin.com/in/rasel-code-dev",
      github: "https://github.com/rasel-code-dev"
    },
    skills: [
      {name: "Javascript", value: 90, color: "red" },
      {name: "React", value: 95, color: "green"},
      {name: "Golang", value: 60, color: "pink"},
      {name: "CSS", value: 90, color: "orange"},
      {name: "Mongodb", value: 80, color: "indiago"},
      {name: "MySQL", value: 75, color: "blue"},
      {name: "HTML", value: 90, color: "green"},
      {name: "SCSS", value: 80, color: "red"},
      {name: "NODE JS", value: 90, color: "pink"}
    ],
    skills_description: "" +
      "I have been working on this platform last three years and I am use HTML & CSS (usually SCSS and LESS) & javascript  every day, and I try to keep up with the latest features while maintaining graceful degradation.\n    " +
      " I use JavaScript fairly often, usually with React js. I also run Node.js-based workflow automation via webpack or vite js for web projects,\n " +
      "and I’ve written other Node scripts to automate mundane tasks.\n\nMy main server-side language is JAVASCRIPT and Golang, it quite often paired with MySQL and MongoDB. \n" +
      "I usually use react js and vue js for client sites, depending on requirements. most of project i write code from scratch.\nall of my programming project github help me a lot. Check out my GitHub page for random projects and contributions to other open source projects.",
    skills_section__subtitle: "skills are achievement.",
    ...props.initialData,
  })
  
  
  // it call when action function call dispatch function. from connect HOC component
  // so that out state globally updated
  function callback(updateState){
    setState(updateState)
    return updateState
  }
  
  return (
    <div className="wrapper">
      <MyContext.Provider value={{state, callback}} >
        { props.children }
      </MyContext.Provider>
    </div>
  )
  
}
export default AppWrapper
