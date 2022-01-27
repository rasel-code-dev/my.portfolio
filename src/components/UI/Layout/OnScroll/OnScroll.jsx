import  React from "react"

let id;
let g;

function throttle(fn, wait){
  let time = Date.now()
  return function (){
    // clear timeout if it not last scroll
    clearTimeout(id)
    
    let afterDelay = time + wait
    if(afterDelay - Date.now() < 0){
      fn()
      time = Date.now()
    }
    id = setTimeout(()=>{
      fn()
      // console.log("last scroll")
    }, 2000)
  }
}

const OnScroll = (WrapperComponent, wait )=>{
  return function (props){
    
    const [offsetTop, setOffsetTop] = React.useState({offsetTop: 0})
  
    g = setOffsetTop
    
    
    React.useEffect(()=>{
      // setOffsetTop({
      //   offsetTop:  document.body.scrollTop || document.documentElement.scrollTop
      // })
      //
      window.addEventListener("scroll", throttle(handler, wait))
      return ()=>{
        return window.removeEventListener("scroll", throttle(handler, wait))
      }
    }, [])
    
    function handler(e){
      let top = document.body.scrollTop || document.documentElement.scrollTop
      setOffsetTop({
        offsetTop:  top
      })
    }
    
    return <WrapperComponent {...props} offsetTop={offsetTop}   />
  }
}

export default OnScroll