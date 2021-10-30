

export function $(selector){
  return document.querySelector(selector)
}
export function $$(selector){
  return document.querySelectorAll(selector)
}

export function isViewport(el, extraTop){
  let rect = el.getBoundingClientRect()
  return rect.top > 0 &&  ((rect.y + extraTop) <= window.innerHeight)
}


export function isViewportCb(el, cb){
  let x = el.getBoundingClientRect()
  if((x.y || x.top) <= window.innerHeight){
    if((x.height + x.top) <= -1){
      // console.log("hidden")
      cb(false)
    } else {
      cb(true)
      // console.log("visi")
    }
  } else{
    cb(false)
    // console.log("hidden")
  }
}

