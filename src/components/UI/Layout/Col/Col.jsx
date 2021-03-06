import React from 'react'




const Col = (props) => {

  const { col, sm, md, lg, xl,offset, offsetSm, offsetMd, offsetLg, offsetXl, 
    className,  bg, color, m, mt, mb, ml, mr, mx, my,
    p, pt, pb, pl, pr, py, px, waves, children, ...attributes } = props
  
  const classes = [
    col ? 'col-' + col : '',
    sm ? 'col-sm-' + sm : '',
    md ? 'col-md-' + md : '',
    lg ? 'col-lg-' + lg : '',
    xl ? 'col-xl-' + xl : '',
    !col && !sm && !md && !lg && !xl ? 'col' : '',
    offset ? 'offset-' + offset : '',
    offsetSm ? 'offset-sm-' + offsetSm : '',
    offsetMd ? 'offset-md-' + offsetMd : '',
    offsetLg ? 'offset-lg-' + offsetLg : '',
    offsetXl ? 'offset-xl-' + offsetXl : '',
    className,
  ].join(" ").trim();

  return (
    <div data-test="col" className={classes}  {...attributes}>
      {children}
    </div>
  )
}

export default Col