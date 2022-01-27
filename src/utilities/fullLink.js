import {backend} from "src/apis/axiosInstance";

export default function (link) {
  if(link){
    if(link.startsWith("http")){
      return link
    } else {
      return backend + "/" + link
    }
  }
}