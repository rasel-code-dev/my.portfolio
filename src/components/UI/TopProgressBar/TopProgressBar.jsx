import React from "react"
import LoadingBar from 'react-top-loading-bar' 

const TopProgressBar = (props) => { 
  
  const el = React.useRef(null)
  
  React.useEffect(()=>{
     el.current && el.current.staticStart() 
     return ()=>{
      el.current && el.current.complete()
     }
  }, [])
  
  return (
    <div> 
      <LoadingBar color="#f11946" ref={el} shadow={true} />
    </div>
  )
  
}

export default TopProgressBar