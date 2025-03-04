import React, { useState, useEffect } from "react";
import axios from "axios";
import CreatePost from "./components/CreatePost";
import Header from "./components/Header";
import Feed from "./components/Feed";

function App() {
  const [posts, setPosts] = useState([]);

  // Fetch posts when the app loads
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Add a new post to state after creation
  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="App">
      <Header />
      <CreatePost onPostCreated={addPost} />
      <Feed posts={posts} setPosts={setPosts} />
    </div>
  );
}

export default App;
