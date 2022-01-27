import React from 'react';



const Box = (props) => {
  const {  bg, color, m, mt, mb, ml, mr, mx, my,
    p, pt, pb, pl, pr, py, px, waves, children, ...attributes } = props
  

  
  return (
    <div data-test="box"  {...attributes}>
      {children}
    </div>
  )
};

export default Box;