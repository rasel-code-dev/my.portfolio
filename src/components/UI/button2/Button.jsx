import React from 'react';
import classes from "./button.module.scss"

// interface ButtonProps {
//   hover?: boolean
//   prefixIcon?: React.ReactElement,
//   theme?: "primary" | "transparent",
//   outline?: boolean
//   suffixIcon?: React.ReactElement,
//   className?: string
//   href?: string
//   onClick?: any
// }


const Button = (props) => {
  const { hover=true, href, theme="", outline=false, prefixIcon, suffixIcon, className, ...attributes } = props
  
  function hasPrefixOrSuffix(){
    return !!(prefixIcon || suffixIcon)
  }
  
  function renderPrefixIcon(){
    let preFixIconElProps = {...prefixIcon.props}
    preFixIconElProps.className = [preFixIconElProps.className + " " + classes.prefixIcon]
    return React.cloneElement(prefixIcon, preFixIconElProps)
  }
    function renderSuffixIcon(){
    let suffixIconElProps = {...suffixIcon.props}
      suffixIconElProps.className = [suffixIconElProps.className + " " + classes.suffixIcon]
    return React.cloneElement(suffixIcon, suffixIconElProps)
  }
  
  function btnClasses(){
    let cls =  [classes.btn2, className]
    if(!hover){
      cls.push(classes.noHover)
    }
    if(hasPrefixOrSuffix()){
      cls.push(classes.alignCenter)
    }
    if(theme){
      cls.push(`${classes[`btn2-${theme}`]}`)
    };
    if(outline){
      cls.push(`${classes[`btn2-outline`]}`)
    }
    if(!!href){
      cls.push(classes['btn2-link'])
    }
    return cls
  }
  
  
  return !!href ? (
    <a href={href} className={btnClasses().join(" ").trim()} {...attributes}>
      {prefixIcon && renderPrefixIcon()}
      {props.children}
      {suffixIcon && renderSuffixIcon()}
    </a>
    ) : (
    <button className={btnClasses().join(" ").trim()} {...attributes}>
      {prefixIcon && renderPrefixIcon()}
      {props.children}
      {suffixIcon && renderSuffixIcon()}
    </button>
  )
}


export default Button