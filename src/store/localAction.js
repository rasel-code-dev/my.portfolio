import {$} from "src/utilities/isViewport";


export function addBlur(className){
  let h =  $(`.${className}`)
  if(h){
    h.classList.add("blur")
    h.classList.remove("remove-blur")
    toggleDisableScroll(true)
  }
}

export function removeBlur(className){
  let h =  $(`.${className}`)
  if(h){
    h.classList.add("remove-blur")
    h.classList.remove("blur")
    toggleDisableScroll(false)
  }
}


export function toggleDisableScroll(isDisable){
  if(typeof window !== "undefined"){
    if(isDisable){
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }
}

