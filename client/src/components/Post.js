import React, { useState, useEffect } from "react";
import axios from "axios";
import Comment from "./Comment";
import "../styles/Post.css";

function Post({
  postId,
  image,
  caption,
  likes: initialLikes,
  isLiked: initialIsLiked,
  createdAt,
  onDelete,
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/posts/${postId}/comments`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const response = await axios.post(
        `http://localhost:5000/api/posts/${postId}/comments`,
        { text: newComment }
      );
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleToggleLike = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/posts/${postId}/toggle-like`
      );
      setLikes(response.data.likes);
      setIsLiked(response.data.isLiked);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`);
      onDelete(postId); // Notify parent component to remove the post from state
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const formattedDateTime = new Date(createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="post">
      <img src={image} alt="Post" className="post-image" />
      <p className="post-caption">{caption}</p>
      <div className="post-meta">
        <span className="post-date">Posted on {formattedDateTime}</span>
      </div>
      <div className="post-interactions">
        <button onClick={handleToggleLike} className="like-button">
          {isLiked ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="red"
              width="24px"
              height="24px"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="24px"
              height="24px"
            >
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78-.02L12 5.91l-1.06-1.32a5.5 5.5 0 00-7.78-.02A5.51 5.51 0 002 8c0 3.28 2.4 6.36 7.55 10.54L12 21l2.45-2.46C19.6 14.36 22 11.28 22 8a5.51 5.51 0 00-1.16-3.39z" />
            </svg>
          )}
        </button>
        <span className="like-count">
          {likes} {likes === 1 ? "like" : "likes"}
        </span>
        <button onClick={handleDeletePost} className="delete-button">
          🗑️ Delete
        </button>
      </div>
      <div className="post-comments">
        {comments.map((comment) => (
          <Comment key={comment._id} text={comment.text} />
        ))}
      </div>
      <form onSubmit={handleAddComment} className="comment-form">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="comment-input"
        />
        <button type="submit" className="comment-submit">
          Post
        </button>
      </form>
    </div>
  );
}

export default Post;
