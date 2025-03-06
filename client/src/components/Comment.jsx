import React from "react";
import "../styles/Comment.css";

function Comment({ username, text }) {
  return (
    <div className="comment">
      <span className="comment-username">{username}</span>
      <span className="comment-text">{text}</span>
    </div>
  );
}

export default Comment;
