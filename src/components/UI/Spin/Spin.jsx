import React from 'react';
import SpinCSS from  "./Spin.module.scss"


// interface SpinProps {
//   size?: number
//   style?: React.CSSProperties
//   baseBorderColor?: string
//   border?: number
//   loaderBorderColor?: string
// }

const Spin = (props) => {
  
  const { style, size, border=3, baseBorderColor, loaderBorderColor } = props
  
  const spinnerStyles = {}
  if(size && size !== 0){
    spinnerStyles.width = size + "px"
    spinnerStyles.height = size + "px"
  }
  
  const baseLoader = {}
  const overlayStyles = {}
  
  
  baseLoader.border = `${border ? border : 3}px solid ${baseBorderColor ? baseBorderColor : '#cbcbcb'}`
  overlayStyles.borderWidth = `${border ? border : 3}px`
  overlayStyles.borderRightColor = `${loaderBorderColor ? loaderBorderColor : "#587fff"}`

  return (
    <div style={{...style, ...spinnerStyles}} className={SpinCSS["spinner"]}>
      <span style={baseLoader} className={SpinCSS["base-loader"]} />
      <span style={overlayStyles} className={SpinCSS["overlay-loader"]} />
    </div>
  );
};

export default Spin;

