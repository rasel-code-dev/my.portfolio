import React from 'react'

import commentForm from './comment_form.module.scss'
import Button from "UI/Button/Button";

// import connect from "../../state/connect";

// import {fullLink} from "../../helperFn/fullLink";

const CommentForm = (props) => {
  const { onChangeForm, parentCommentId, isRoot, avatar  } = props
  const [ newComment, setNewComment ] = React.useState({description:"", username: ""})
  
  function handleChange(e){
    let name = e.target.name
    if(name === "button") {
      if(newComment.username !== "" && newComment.description !== "") {
        onChangeForm(newComment, parentCommentId)
      }
    } else{
      setNewComment({ ...newComment, [name]: e.target.value})
    }
  }
  

  return (
    <div className={commentForm.comment_form}>
      <img className="user-avatar" src={avatar} alt="logo"/>

    <form className={commentForm.comment_form__form} onSubmit={(e)=>e.preventDefault()} >
      <div className="form-group name">
        <input name="username" onChange={handleChange} value={newComment.username} type="text" placeholder="Your Name" />
      </div>
      <div className="form-group textarea ">
        <textarea
          style={{ minHeight: isRoot ? "150px" : "50px" }}
          onChange={handleChange}
          className="form__textarea"
          placeholder="Write a Comment"
          name="description"
          value={newComment.description}
        />
      </div>
        <Button onClick={handleChange} name="button" className="post-comment-btn">Post</Button>
    </form>
    </div>  
  )
}

export default CommentForm
