import axios from "axios";

const origin = typeof window !== 'undefined' && window.location.origin
  ? window.location.origin
  : process.env.ORIGIN;

export const backend = "http://localhost:3000"


export default axios.create({
  baseURL: backend,
  withCredentials: true,
  headers: {
    authorization: typeof window != "undefined" ? window.localStorage.getItem("token") : ""
  }
})

