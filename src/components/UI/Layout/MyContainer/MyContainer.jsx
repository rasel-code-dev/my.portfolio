import React from 'react'



const MyContainer = (props) => {
  
  const { fluid, full, justify, alignItems, style, bg, color, m, mt, mb, ml, mr, mx, my, p, pt, pb, pl, pr, py, px, waves, className, children, ...attributes} = props
  

  const classes = [className, fluid ? "my-container-fluid" : full ? "my-container-full" : "my-container" ].join(" ")

  return (
    <div className={classes} style={style} {...attributes} >
      { props.children }
    </div>
  )
}

export default MyContainer
