import React from 'react';
import bdcls from  "./badge.module.scss"

const Badge = (props) => {
  
  const {theme, className, ...attributes} = props
 
  function badgeClasses(){
    let badgeClass = [bdcls.badge, className]
    if (theme){
      badgeClass.push(bdcls[`badge-${theme}`])
    }
    return badgeClass
  }
  
  
  return (
    <div className={badgeClasses().join(" ")}>
      {props.children}
    </div>
  );
}


export default Badge