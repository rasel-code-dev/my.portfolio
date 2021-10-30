import React  from "react"
import Spin from "src/components/UI/Spin/Spin";

// type ButtonProps = {
//   className?: string
//   children?: any,
//   disabled?:boolean
//   onClick?: any
//   isLoading?: boolean
//   loadingText?: string
// }

const Button =  (props)=>{
  const {className, children, isLoading, loadingText, ...attributes} = props
  
  return <button className={["btn", className].join(" ")} {...attributes}>
    { isLoading ? (
      <>
        {loadingText}
        <Spin/>
      </>
    ) :
    children
    }
  </button>
}


export default Button