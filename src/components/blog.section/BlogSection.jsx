import React from 'react';


import marked from  "marked"
import hljs from "highlight.js";
import 'highlight.js/styles/github.css';

import {CSSTransition} from "react-transition-group";

import {fetchPosts, fetchPosts2, fitlerPosts, commentPostHandler, toggleLike, toggleLoading} from "src/store/actions";
import {fullLink} from "src/utilities/fullLink";
import connect from "src/store/connect";
import Spin from "src/components/UI/Spin/Spin";

import Button from "src/components/UI/button2/Button";

import { Row } from "src/components/UI/Layout";
import axiosInstance from "src/apis/axiosInstance";

import classes from "./blog.section.module.scss"
import {addBlur, removeBlur} from "../../store/localAction";
import Modal from "../UI/Modal/Modal";
import CommentForm from "../UI/Comments/CommentForm";
import Input from "../UI/Form/Input";

// import Posts from "components/Admin/Posts";
// import marked from  "marked"
// import hljs from "highlight.js";
// import 'highlight.js/styles/github.css';

// import Comment from "src/components/Comments/Comment";
// import CommentForm from 'app/components/Comments/CommentForm';
// import {addBlur, removeBlur} from "src/localAction";

// interface PostType{
//   id: string
//   title: string
//   description: string
//   path: string
//   slug: string
//   createdAt: string,
//   tags: string[]
//   likes: []
//   comments: any
//   mdContent: string
// }

const BlogSection = (props) => {
  
  const state =  props.state

  const tags = ["All", "Javascript", "Nodejs", "Expressjs", "golang", "Reactjs", "mongodb", "MySql", "WSL"]
  const [ selectTag, setTag ] = React.useState("all")
  const [postDetails, setPostDetails] = React.useState({
    comments: [],
    createdAt: "",
    description: "",
    id: "",
    likes: [],
    mdContent: "",
    path: "",
    slug: "",
    tags: [],
    title: ""
  })
  
  const [postContent, setPostContent] = React.useState("")
  const [newComment, setNewComment] = React.useState({ username: "", description: "" })
  
  const [ isLoading, setLoading ] = React.useState(false)
  const [ isLoadingFetchPosts, setIsLoadingFetchPosts ] = React.useState(false)
  const [ clickedPost, setClickedPost ] = React.useState("")
  
  const [ replyFormId, setReplyFormId ]  = React.useState("")
  const [ filtersPost, setFiltersPosts ]  = React.useState([])
  
  const { posts } = props.state
  
  const postDetailsRef = React.useRef()
  
  React.useEffect(()=>{
    setFiltersPosts(posts)
  }, [posts])
  
  React.useEffect(()=>{
    props.fetchPosts()
    marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function(code, lang) {
          const language = hljs.getLanguage(lang) ? lang : 'plaintext';
          return hljs.highlight(code, { language }).value;
        },
        pedantic: false,
        gfm: true,
        tables: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
      }
    );
  } , [])
  
  function readFullPost(postid){

    let p = {
      comments: undefined,
      createdAt: "",
      description: "",
      id: "",
      likes: [],
      mdContent: "",
      path: "",
      slug: "",
      tags: [],
      title: ""
    }
    let fp = posts.find(p=>p.id === postid )
    if(!fp) return null
    
    p = fp
    
    setPostDetails({ ...p})
    addBlur("App_Content")
    
    axiosInstance.get(`/api/posts/md-html/${p.slug}`).then(r=>{
      const { data, status } = r
      if(status >= 200 && status < 400) {
        let c = marked(data.md)
        setPostDetails({...p, mdContent: c})
        
      }
    }).catch(ex=>{
      console.log("error")
    })
  }
  
  function closePostDetail(){
    removeBlur("App_Content")
    setPostDetails({
      comments: undefined,
      createdAt: "",
      description: "",
      id: "",
      likes: [],
      mdContent: "",
      path: "",
      slug: "",
      tags: [],
      title: ""
    })
   
  }
  
  function expandReplyFormFn(id, parentCommentid) {
    setReplyFormId(replyFormId === id ? "" : id)
  }
  
  function onChangeForm(newComment, parentCommentId){
  
    // console.log(newComment, parentCommentId)
    
    let newComm = {
      ...newComment,
      username: props.isAdmin ? "Admin" : newComment.username,
      avatar: props.isAdmin ? props.profile_photo : ""
    }
    
    if(replyFormId){
      newComm.parentCommentId = replyFormId
    }

    axiosInstance.post(`/api/comments/${postDetails.id}`, newComm)
      .then(r=>{
        const { status, data } = r
        if(status >= 200 && status < 400){
          // let p = {...postDetails, comments: [...postDetails.comments, r.data.newComment]}
          // setPostDetails(p)
        }
      })
  }
  
  function handleChange(e) {
    setNewComment({
      ...newComment,
      [e.target.name]: e.target.value
    })
  }
  
  function savePostComment() {
    props.commentPostHandler({ username: newComment.username, description: newComment.description }, postDetails.id)
  }
  
  function filterPostByTag(tag){
    let filteredPostUP = []
    if(tag.toLowerCase() === "all"){
      filteredPostUP = posts
    } else {
      let tt = tag
      
      posts && posts.forEach(post => {
        if (post.tags) {
          post.tags.forEach(t => {
            if (t.toLowerCase() === tt.toLowerCase()) {
              filteredPostUP.push(post)
            } else {
              // console.log(post)
            }
          })
        }
      })
    }
    
    setTag(tag.toLowerCase())
    setIsLoadingFetchPosts(true)
    setFiltersPosts(filteredPostUP)
    setTimeout(()=>{
      setIsLoadingFetchPosts(false)
    }, 200)
  }
  
  function isLike(post){
    // console.log(state.browser_id)
    return post.likes && post.likes.indexOf(state.browser_id) !== -1
  }
  
  function handleLike(post){
    setLoading(true)
    setClickedPost(post.id)
    let isLiked = post.likes.findIndex(p=>p === state.browser_id  )
    if(isLiked === -1){
      props.toggleLike(post.id, false, setLoading)
    } else {
      props.toggleLike(post.id, true, setLoading)
    }
  }
  
  return (
    <section className="section" id="blog-section">
      <div className="container">
        <div className="row-b mt-20">
          <h1 className="section-title">Blog</h1>
          <h6 className="sub-title t-center">My Latest Blog Posts</h6>
        </div>
        
        <div className={"row-b " + classes["blog-content"]}>
    
          <div className={classes["blog-post-filter-nav"]}>
          { tags.map((tag, i)=>(
            <Button
              className={[classes["blogPostFilterNav__item"], selectTag === tag.toLowerCase() ? classes["active-item"]: ""].join(" ")}
              key={i}
              // style={{ background: colors[i] } }
              onClick={(e)=>filterPostByTag(tag)}
              // className={ ["blog-post-filter-nav__item", selectTag === tag.toLowerCase() ? "active": ""].join(" ")
              >{tag}</Button>
          ))  }
          </div>
          
          <div className="row relative">
            <CSSTransition unmountOnExit in={postDetails.id} timeout={500} classNames="show-blog-post">
              <Modal className="post-details-wrapper__modal" title={postDetails.title} onClose={closePostDetail}>
              
                  <div className="post-details-wrapper">
                  {/*<h2 className={classes['post-title']}>{postDetails.title}</h2>*/}
                  {/*<button onClick={closePostDetail} className={"btn " + classes['post-close-btn']  + " " + classes['shake-btn'] }>X</button>*/}
                  <div ref={postDetailsRef} className="post-details">
                    <div className="post-description">
                      {/*<RenderMakdown markdown={postDetails.markdown}  />*/}
                      <div dangerouslySetInnerHTML={{__html: postDetails.mdContent}} />
        
                      <h3 className="mt-5">Write a Comment...</h3>
                      
                      <div className="comment-form">
                        <Input
                          type="text"
                          id="username"
                          name="username"
                          label="Your name"
                          value={newComment.username}
                          placeholder="Your name"
                          onChange={handleChange}
                        />
                        <Input
                          as="textarea"
                          id="comment"
                          name="description"
                          label="Comment"
                          value={newComment.description}
                          placeholder="Comment"
                          onChange={handleChange}
                        />
                        <Button onClick={savePostComment}>Post</Button>
                      </div>
                      
                      { postDetails.comments && postDetails.comments.map(comment=>(
                        <div className={classes.comment}>
                          <div  className={classes.comment_content}>
                            <h4 className={classes.comment_author_name}>{comment.username}</h4>
                            <p className={classes.comment_text}>{comment.description}</p>
                          </div>
                          <div className={classes.comment_meta}>
                            <span className={classes.comment_date}>replay</span>
                            <span className={classes.comment_date}>On {new Date(comment.createdAt).toDateString()}</span>
                          </div>
                        </div>
                        // <h1>Comment</h1>
                        // <Comment
                        //   username={comment.username}
                        //   profile_photo={state.profile_photo}
                        //   description={comment.description}
                        //   createAt={comment.createAt}
                        //   reply={comment.reply}
                        //   id={comment.id}
                        //   avatar={comment.avatar}
                        //   isAdmin={state.isAdmin}
                        //   // createAt
                        //   // reply:
                        //   // id:
                        //   // avatar:
                        //   // replyFormId:
                        //   // expandReplyFormFn:
                        //   // onChangeForm:
                        //   // deleteComment:
                        //   // isAdmin:
                        //   // profile_photo={props.profile_photo}
                        //   // key={comment.id}
                        //   // isAdmin={props.isAdmin}
                        //   // deleteComment={deleteComment}
                        //   // onChangeForm={onChangeForm}
                        //   // expandReplyFormFn={expandReplyFormFn}
                        //   // replyFormId={replyFormId}
                        //   // username={comment.username}
                        //   // createAt={comment.createdAt}
                        //   // description={comment.description}
                        //   // id={comment.id}
                        //   // avatar={avatar}
                        //   // reply={comment.reply}
                        // />
                      )) }
                    </div>
                </div>
                </div>
              </Modal>
            </CSSTransition>
          </div>
          
          <Row justify={"center"} mt={20}>
            { isLoadingFetchPosts && <Spin size={20} border={2} /> }
          </Row>
          
          <Row>
            <div className={classes.posts}>
              { filtersPost && filtersPost.length > 0  && filtersPost.map(post=>(
                <div className={classes.post} key={post.id}>
                  <div className="row">
                    <div className={classes['post-header']}>
                      <div className={classes['post-avatar']}>
                        <img src={fullLink(post.avatar)} alt="rasel-code-dev"/>
                      </div>
                      <div className="row flex-direction-column">
                        <h4 onClick={(e)=>readFullPost(post.id)} className={classes['post-title']}>{post.title}</h4>
                        <h5 className={classes['post-time']}>created at { new Date().toLocaleDateString() } </h5>
                      </div>
                      
                    </div>
              
                    <p className={classes['post-description']}>{post.description} </p>
                    <span onClick={(e)=>readFullPost(post.id)} className={classes['read-more']}>read more</span>
                  </div>
                  <div className={classes['post-meta'] + " row"}>
                    <div className={classes.reaction}>
                      <li >
                        { clickedPost === post.id && isLoading  ? (
                          <Spin style={{marginRight: 5}} size={13} border={2} />
                        ) : (
                          <>
                          <i
                            onClick={()=>handleLike(post)}
                            style={{ color:  isLike(post) ? "red": "" }}
                            className={["fa-heart", isLike(post) ? "fas" : "far"].join(" ")} />
                            <span>{post.likes && post.likes.length === 0 ? "" : post.likes.length}</span>
                          </>
                        )  }
                        
                      </li>
                      
                      <li onClick={(e)=>readFullPost(post.id)} >
                        <i className="far fa-comment-alt" />
                        <span>{post.comments && post.comments.length === 0 ? "" : post.comments.length}</span>
                      </li>
                      
                    </div>
            
                  </div>
          
                </div>
              ))}
            </div>
          </Row>
          <div className="d-flex justify-content-center" >
            { filtersPost && filtersPost.length <= 0 && (
              <h4 className={classes['post-not-found-title']}>{ selectTag !== "all" ? (
                  <>
                    <span>No Blog Post found in </span>
                    <span className={classes['category-tag']}>{`${selectTag}`}</span>
                    <span> Category</span>
                  </>
                )
                : <span>No Blog Post Found</span> }</h4>
            ) }
          </div>
        </div>
        
        <div className={classes.hire_me}>
            <div className={classes.card + " card t-center"}>
              <h1>Now I am ready to start work for you!</h1>
              <div className="d-flex justify-content-center">
                <Button
                  href="#contact-section"
                  outline={true}
                  prefixIcon={<i className="fad fa-badge-check" />}>
                  Hire me!
                </Button>
              </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default connect(BlogSection, {toggleLike, toggleLoading, fetchPosts, fitlerPosts, commentPostHandler});