import React from "react";
import Post from "./Post";
import "../styles/Feed.css";

function Feed({ posts, setPosts }) {
  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post._id !== postId));
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
            createdAt={post.createdAt}
            onDelete={handleDeletePost}
          />
        ))
      )}
    </div>
  );
}

export default Feed;
