import React from 'react';
import classes from "./style.module.scss"

const Input = (props) => {
  const { as="input", type="text", required=false, name, label, minHeight, placeholder, onClick, onChange, ...other } = props
  
  const imageTag = React.useRef()
  
  let style = {}
  let Tag;
  if(as === "textarea"){
    Tag = "textarea"
    style.minHeight = minHeight + "px"
  } else{
    Tag = "input"
  }
  
  function handleClick(e){
    if(imageTag.current){
      imageTag.current.click()
    }
  }
  
  return (
    <div className={classes["form-group"]}>
      { as === "input" ? (
        type === "file" ? (
          <>
            <input
              name={name}
              onClick={handleClick}
              disabled={false}
              value={value}
              type="button"
              onChange={onChange}
            />
            <input name={name} ref={imageTag} onChange={onChange} className={classes["hidden-input-file"]}  type="file" />
          </>
      ) : (
          <>
            {label && <label className={[required ? classes.required : ""].join(" ")} htmlFor={name}>{label}</label> }
            <Tag
              name={name}
              type={type}
              style={style}
              id={name}
              onClick={handleClick}
              onChange={onChange}
              placeholder={placeholder}
              {...other}
            />
          </>
      )
    ) : (
        <>
          {label && <label className={[required ? classes.required : ""].join(" ")} htmlFor={name}>{label}</label> }
          <Tag
            name={name}
            type="textarea"
            style={style}
            id={name}
            onClick={handleClick}
            onChange={onChange}
            placeholder={placeholder}
            {...other}
          />
        </>
      )
    }
    </div>
  );
}

export default Input;