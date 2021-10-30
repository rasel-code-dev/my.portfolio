
import {backend} from "../apis/axiosInstance"


export function fullLink(path, localFile){
  let f = ""
  if(localFile){
    if (!path){
      f = localFile
    }
  }else{
    f = backend + "/" + path
  }
  return f
}