import React, { Component } from "react";

import "./Comment.css";
import CommentForm from "./CommentForm";

import avatar2 from "../../asserts/avatar/img_avatar3.png"
import {fullLink} from "../../helperFn/fullLink";

const Comment = props => {
  const { username,
    profile_photo,
    description, createAt,
    reply, _id, avatar, replyFormId,
    expandReplyFormFn,
    onChangeForm,
    deleteComment,
    isAdmin
    
  } = props;
  const [showReplayForm, setReplayForm] = React.useState(false);

  function handleNestedReplay(e) {
    setReplayForm(!showReplayForm);
  }
  
  function oneNestedComment(reply, parentComment_id, isAdmin) {
    if (reply && reply.length > 0) {
      return reply.map(comment => {
        return (
            <div className="comment">
            {commentAvatar(comment.avatar ? fullLink(comment.avatar) : avatar2, comment.username)}
            <div className="comment_content">
              {commentContent(
                comment.username,
                comment.description,
                comment.createdAt,
                comment._id,
                parentComment_id,
                true,
                isAdmin
              )}
              {/*{twoNestedComment(comment.reply)}*/}
            </div>
          </div>
        )
      });
    }
  }
  
  function commentContent(username, description, createdAt, _id, parentComment_id, isEnd, isAdmin) {
    return (
      <React.Fragment>
        <div className="comment_text">
          <span className="commenter_username">
            <a href="#">{username}</a>
          </span>
          <span className="comment_description">{description}</span>
        </div>
        <div className="comment_meta">
          { !isEnd && <li onClick={(e)=>expandReplyFormFn(_id, parentComment_id)} className="nested_replay">
            Reply
          </li> }
          <li>on {new Date(createdAt).toLocaleDateString()}</li>
          { isAdmin ? <li onClick={()=>deleteComment(_id, parentComment_id)}><i className="far fa-trash" /></li> : '' }
        </div>
        <div className="replay_form">{
          replyFormId === _id && <CommentForm
            onChangeForm={onChangeForm}
            parentCommentId={parentComment_id}
            isRoot={false} />
        }</div>
      </React.Fragment>
    );
  }

  function commentAvatar(avatar, name) {
    return (
      <div className="commenter_avatar">
        <img src={name === "Admin" ? fullLink(profile_photo) : avatar  } alt={avatar} />
      </div>
    );
  }

  return (
    <div className="comment_wrapper">
      <div className="comment">
        {commentAvatar(avatar, username)}
        <div className="comment_content">
          {commentContent(username, description, createAt, _id, null, false, isAdmin)}
          <div className="nested_comment_item">{oneNestedComment(reply, _id, isAdmin)}</div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
