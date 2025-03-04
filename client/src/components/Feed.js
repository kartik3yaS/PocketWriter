import React from "react";
import Post from "./Post";
import "../styles/Feed.css";

function Feed({ posts, setPosts }) {
  // Function to remove a deleted post from state
  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post._id !== postId)); // Remove deleted post
  };

  return (
    <div className="feed">
      {posts.length === 0 ? (
        <p>No posts yet! Create your first post.</p>
      ) : (
        posts.map((post) => (
          <Post
            key={post._id}
            postId={post._id}
            image={post.image}
            caption={post.caption}
            likes={post.likes}
            isLiked={post.isLiked}
            createdAt={post.createdAt} // Pass createdAt to Post component
            onDelete={handleDeletePost} // Pass delete handler to Post component
          />
        ))
      )}
    </div>
  );
}

export default Feed;
