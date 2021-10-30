import React from 'react';
import ReactDOM from "react-dom"
import BackdropCSS from "./Backdrop.module.scss"

// interface BackdropProps{
//   isOpenBackdrop: boolean
//   bg?: string
//   style?: object
// }

const Backdrop = (props) => {
  const { isOpenBackdrop, style, bg  } = props
  
  React.useEffect(()=>{
    window.addEventListener("click", (e)=>{
      // if(!(e.target as HTMLDivElement).id ! ){
      //   alert("close Backdrop")
      //
      // }
    })
  }, [])
  if(typeof window !== "undefined") {
    return ReactDOM.createPortal(
      <div style={{...style, background: bg}}
           className={[BackdropCSS.backdrop, isOpenBackdrop ? BackdropCSS["open-backdrop"] : ""].join(" ")}/>,
      document.querySelector("#backdrop-root")
    )
  } else {
    return null
  }
}

export default Backdrop