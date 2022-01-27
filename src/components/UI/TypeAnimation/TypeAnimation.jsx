import React from 'react';
import Typewriter from 'typewriter-effect';
// import TypeAnimationCSS from  "./TypeAnimation.module.scss"

const TypeAnimation = (props) => {
  return (
    <Typewriter
      options={{
        autoStart: true,
        loop: true,
      }}
      onInit={(typewriter) => {
        typewriter.typeString('')
          .typeString("Web ")
          // .pauseFor(10)
          .typeString('Designer')
          .pauseFor(800)
          .deleteChars(6)
          .typeString('veloper')
          .pauseFor(800)
          .deleteAll()
          .start();
      }}
    />
  )
}
export default TypeAnimation;