import React from 'react';

import mouseScrollModule from "./MouseOnScroll.module.scss"

let increaseYId;
const MouseOnScroll = (props) => {
  
  const { src } = props
  
  let i = 0
  const [imgClientHeight, setImgClientHeight ] = React.useState(0);

  const [ boxTranslateY, setBoxTranslateY ] = React.useState(0)
  const [ boxClientHeight, setBoxClientHeight ] = React.useState(0)
  
  const imageTag = React.useRef()
  const boxRef = React.useRef()
  

  React.useEffect(()=>{
    if(boxRef.current){
      setBoxClientHeight(boxRef.current.clientHeight)
    }
    imageTag.current.onload = function (e){
      setImgClientHeight( imageTag.current.clientHeight )
    }
  }, [imageTag.current, boxRef.current])
  
  
  function autoIncrement(){
    increaseYId =  setInterval(()=>{
      if((imgClientHeight - boxClientHeight) <= i ){
        clearInterval(increaseYId)
        // console.log("end of image", i)
        // i=0
        // setBoxTranslateY( 0 )
      } else{
        i = i + 20
        setBoxTranslateY( i )
      }
    }, 100)
  }
  
  function handleMouseOver(){
    //**** only scroll when img large than container
    if(imgClientHeight > boxClientHeight) {
      autoIncrement()
    }
   
  }
  
  function handleMouseLeave(){
    // console.log("leave")
    clearInterval(increaseYId)
    i = 0
    setBoxTranslateY( 0 )
  }
  
  return (
    <div ref={boxRef}
         onMouseLeave={handleMouseLeave}
         onMouseOver={handleMouseOver}
         className={mouseScrollModule.scroll_item}>
      <div className={mouseScrollModule.img_wrapper} style={{transform: `translateY(-${boxTranslateY}px)`}}>
        <img ref={imageTag} src={src} alt="No Images Provide" />
      </div>
    </div>
  );
};

export default MouseOnScroll;