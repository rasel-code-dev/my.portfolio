import axiosInstance from "src/apis/axiosInstance";
import {$} from "src/utilities/isViewport";
import {toggleDisableScroll, removeBlur} from "src/store/localAction";

let updatedState = {}

export const fetchData = ()=> (dispatch, state) => {
  axiosInstance.get("/api/data").then(r=>{
    updatedState = {
      ...state.state,
      ...updatedState,
      ...r.data.data,
      isFetchedData: true
    }
    console.log(updatedState)
    updatedState = dispatch(updatedState)

  }).catch(err=>{
    updatedState = {
      ...state.state,
      ...updatedState,
      message: err.response.data.message,
      isFetchedData: false,
      isOpenBackdrop: true
    }
    updatedState = dispatch(updatedState)
  })
}

// *** update single field property
export const updateData = (data)=> (dispatch, state) => {
  axiosInstance.post("/api/data", { data }).then(r=>{
    updatedState = {
      ...state.state,
      ...updatedState,
      ...r.data.data,
      isFetchedData: true
    }
    updatedState = dispatch(updatedState)

  }).catch(err=>{
    console.log(err)
  })
}

export const addData = ()=> (dispatch, state) => {
  // axiosInstance.get("/api/data").then(r=>{
  //   updatedState = {
  //     ...state,
  //     ...updatedState,
  //     ...r.data.data,
  //     isFetchedData: true
  //   }
  //   updatedState = dispatch(updatedState)
  //
  // }).catch(err=>{
  //   console.log(err)
  // })
}

export const fetchProjects=()=>async(dispatch, state)=>{
  axiosInstance.get("/api/projects").then(r=>{
    const { data, status } = r
    if(successStatus(status)) {
      updatedState = {
        ...state.state,
        ...updatedState,
        projects: data.projects
      }
      updatedState = dispatch(updatedState)
    }
  })
}

export const fetchTestimonials = ()=> async (dispatch, state)=>{
  axiosInstance.get("/api/testimonials").then(r=>{
    const { data, status } = r
    if(successStatus(status)) {
      updatedState = dispatch({
        ...state.state,
        ...updatedState,
        testimonials: data,
      })
    }
  })
}

// export const deleteTestimonial = (_id)=> async (dispatch, state)=>{
//   apiInstance.delete(`/api/testimonials/${_id}`).then(r=>{
//     const { data, status } = r
//     // if(successStatus(status)) {
//     //   newState = dispatch({
//     //     ...state,
//     //     ...newState,
//     //     testimonials: data.testimonials,
//     //   })
//     // }
//   })
// }
//
//
//

export const fetchPosts=(d)=>async(dispatch, state)=>{
  console.log(d)
  axiosInstance.get("/api/posts").then(r=>{
    const { data, status } = r
    updatedState = dispatch({
      ...state.state,
      ...updatedState,
      posts: data,
    })
  })
}

export const fetchPosts2=()=>async(dispatch, state)=>{
  
  // loader switch on.........
  updatedState = dispatch({
    ...state.state,
    ...updatedState,
    isLoading: true
  })
  
  axiosInstance.get("/api/posts")
  .then(r=>{
    const { data, status } = r
    if(successStatus(status)) {
      updatedState = dispatch({
        ...state.state,
        ...updatedState,
        posts: data,
        isLoading: false
      })
    }
  })
  
}

export const addPost=(credentials, push)=>async(dispatch, state)=>{
  axiosInstance.post("/api/posts", credentials).then(r=>{
    // push("/admin/dashboard")
    // const { data, status } = r
    // if(successStatus(status)) {
    //   updatedState = dispatch({
    //     ...state.state,
    //     ...updatedState,
    //     posts: data,
    //   })
    // }
  }).catch(err=>{
    console.log(err)
  })
}

export const commentPostHandler = (newComment, post_id) => (dispatch, state)=>{
  axiosInstance.post(`/api/comment/${post_id}`, newComment).then(response=>{
    console.log(response)
  })
}

export const deletePost=(post_id)=>async(dispatch, state)=>{
  axiosInstance.delete(`/api/posts/${post_id}`).then(r=>{
    const { data, status } = r
    if(successStatus(status)) {
      updatedState = dispatch({
        ...state.state,
        ...updatedState,
        posts: data.posts,
      })
    }
  }).catch(err=>{
    console.log(err)
  })
}

export const toggleLike=(post_id, isLike, setLoading)=>async(dispatch, state)=>{
  // loader switch on.........
  // updatedState = dispatch({
  //   ...state.state,
  //   ...updatedState,
  //   isLoading: true
  // })
  
  if(isLike){
    axiosInstance.post(`/api/remove-like/${post_id}`, { browser_id: updatedState.browser_id }).then(r=>{
      const { data, status } = r
      if(successStatus(status)) {
        updatedState = {
          ...state.state,
          ...updatedState,
          // isLoading: false
        }

        let postId = updatedState.posts.findIndex(s=>s.id === data.post.id )
        updatedState.posts[postId] = data.post
        updatedState = dispatch(updatedState)
      }
  
      setLoading(false)
      
    }).catch(err=>{
      console.log(err)
    })
  } else {

    axiosInstance.post(`/api/add-like/${post_id}`, { browser_id: updatedState.browser_id }).then(r=>{
      const { data, status } = r
      if(successStatus(status)) {
        updatedState = {
          ...state.state,
          ...updatedState,
          // isLoading: false
        }

        let postId = updatedState.posts.findIndex(s=>s.id === data.post.id )
        updatedState.posts[postId] = data.post
        updatedState = dispatch(updatedState)
  
        setLoading(false)
        
      }
      
    }).catch(err=>{
      console.log(err)
    })
  }
  
}

export const fitlerPosts=(filter, setIsLoadingFetchPosts)=>async(dispatch, state)=>{
  axiosInstance.post("/api/posts/filter-posts", filter).then(r=>{
    const { data, status } = r
    if(successStatus(status)) {
      const { posts } = data
      updatedState = dispatch({
        ...state.state,
        ...updatedState,
        posts: posts,
      })
      setIsLoadingFetchPosts(false)
    }
  })
}

export const clearMessage=()=>async(dispatch, state)=>{
    removeBlur("App")
    updatedState = dispatch({
      ...state.state,
      ...updatedState,
      message: "",
      isOpenBackdrop: false
    })
}

export const loginAsAdmin=(credentials, push, setIsOpenModal, )=>async(dispatch, state)=>{
  axiosInstance.post("/api/auth/admin-login", credentials).then(r=>{
    const { data } = r
    if(data.token){
      const { token, admin } = data
      localStorage.setItem("token", token)
      updatedState = dispatch({
        ...state.state,
        ...updatedState,
        isAdmin: true,
        adminEmail: admin,
      })
      removeBlur("App")
      push("/admin/dashboard")
    } else{
      // error.......
    }
    
  }).catch(err=>{
    updatedState = {
      ...updatedState,
      ...state.state,
      isAdmin: false,
      message: err.response.data.message
    }
    setIsOpenModal(false)
    updatedState = dispatch(updatedState)
  })
}

export const currentAdmin=()=>async(dispatch, state)=>{
  axiosInstance.post("/api/auth/current-admin", "").then(r=>{
    const { data, status } = r
    if(successStatus(status)) {
      updatedState = {
        ...updatedState,
        ...state.state,
        isAdmin: true,
        adminEmail: data.admin,
      }
  
      updatedState = dispatch(updatedState)
    }
  }).catch(err=>{
    console.log(err.response)
  })
}

export const adminLogout=(push=false)=>(dispatch, state)=>{
  updatedState = dispatch({
    ...state.state,
    ...updatedState,
    isAdmin: false,
    adminEmail: ""
  })
  localStorage.removeItem("token")
  if(push) {
    // push && push("/")
  }
}

export const toggleBackdrop=(isOpenBackdrop)=>(dispatch, state)=>{
  if(typeof window !== "undefined") {
    updatedState = dispatch({
      ...state.state,
      ...updatedState,
      isOpenBackdrop: !!isOpenBackdrop
    })
  
  }
 
}

export const toggleBackdrop2=(isOpen)=>(dispatch, state)=>{
  
  if(typeof window !== "undefined") {
    if (isOpen) {
      $(".App").classList.add("blur")
    } else {
      $(".App").classList.remove("blur")
    }
  }
  updatedState = dispatch({
    ...state.state,
    ...updatedState,
    isOpenBackdrop: isOpen
  })
}

export const toggleNavExpand=(isExpand)=>(dispatch, state)=>{
  if(typeof window !== "undefined") {
    
    let removeBlurTimeID;
    
    let g = $(".App_Content")
    if (!isExpand) {
      removeBlurTimeID  = setTimeout(()=>{
        if(g) {
          g.classList.remove("blur")
          g.classList.add("remove-blur")
          toggleDisableScroll(false)
        }
      }, 800)
    } else {
      removeBlurTimeID && clearTimeout(removeBlurTimeID)
      if(g){
        g.classList.add("blur")
        g.classList.remove("remove-blur")
        toggleDisableScroll(true)
      }
      
    }
  }
  
  updatedState = dispatch({
    ...state.state,
    ...updatedState,
    isNavExpand: isExpand
  })
}

export const setExpandDropdownMenu=(id)=>(dispatch, state)=>{
  updatedState = dispatch({
    ...state.state,
    ...updatedState,
    expandDropdownMenu: id
  })
}

export const toggleLoading=(isLoading)=>(dispatch, state)=>{
  updatedState = dispatch({
    ...state.state,
    ...updatedState,
    isLoading: !!isLoading
  })
}

export const toggleModal=(modalState=false)=>(dispatch, state)=>{
  console.log(state)
  updatedState = dispatch({
    ...state.state,
    ...updatedState,
    isOpenModal: modalState
  })
}

export const toggleLoadingFn=(dispatch, state, isLoading)=>{
  return dispatch({
    ...state.state,
    isLoading: !!isLoading
  })
}


export const setVisitor=()=>async (dispatch, state)=>{
  let data = await axiosInstance.post("/api/visitor")
  console.log(data)
}


// client side get cookie browser_id
export const getBrowserId=()=>async (dispatch, state)=>{
  let arr = document.cookie.split(";") || []
  let id;
  for (let i = 0; i < arr.length; i++) {
    let eachCookieStr = arr[i]
    let eachCookieStrArr = eachCookieStr.split("=")
    let cookieName = eachCookieStrArr[0]
    let cookieValue = eachCookieStrArr[1]
    if(cookieName.trim() === "browser_id"){
      id = cookieValue
    }
  }
  
  if(id){
    updatedState = dispatch({
      ...state.state,
      ...updatedState,
      browser_id: id
    })
  }
}


function successStatus(status){
  if(status >= 200 && status < 400) {
    return true
  } else {
    return false
  }
}

