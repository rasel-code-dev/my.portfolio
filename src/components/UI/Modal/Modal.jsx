import React from 'react';
import ReactDOM from "react-dom"
import ModalCSS from "./modal.module.scss"

// interface ModalProps{
//   title: string,
//   onClose: ()=>any
//   children?: object
//   className?: string
//   style?: React.CSSProperties
// }

const Modal = (props) => {
  
  const { title, onClose, className, style} = props

  return ReactDOM.createPortal(
    <div style={style} className={[ModalCSS.modal, className].join(" ")}>
      <header className={ModalCSS['model-header'] + " align-items-center"}>
        <h3 className={ModalCSS["modal-title"]}>{title}</h3>
        <button onClick={onClose} className="btn model-close-btn">Close</button>
      </header>
      <div className={ModalCSS['modal-content']}>
        {props.children}
      </div>
    </div>,
    
    document.querySelector("#modal-root")
  )
  
};

export default Modal;