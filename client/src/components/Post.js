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
  onDelete, // Callback to notify parent component about deletion
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchComments();
  }, [postId]);

  // Fetch comments for this post
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

  // Add a new comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return; // Prevent empty comments
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

  // Toggle like for this post
  const handleToggleLike = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/posts/${postId}/toggle-like`
      );
      setLikes(response.data.likes); // Update likes count from backend response
      setIsLiked(response.data.isLiked); // Update like state from backend response
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  // Delete this post
  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return; // Confirmation dialog
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`);
      onDelete(postId); // Notify parent component to remove the post from state
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Format the createdAt date and time
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
          <span style={{ color: isLiked ? "red" : "gray" }}>❤️</span>
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
