import React, { useState, useEffect } from "react";
import axios from "axios";
import CreatePost from "./components/CreatePost";
import Header from "./components/Header";
import Feed from "./components/Feed";

function App() {
  const [posts, setPosts] = useState([]);

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
