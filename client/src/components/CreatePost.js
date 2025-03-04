import React, { useState } from "react";
import axios from "axios";
import "../styles/CreatePost.css";

function CreatePost({ onPostCreated }) {
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/posts", {
        image,
        caption,
      });
      onPostCreated(response.data);
      setImage("");
      setCaption("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
      />
      <textarea
        placeholder="Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        required
      ></textarea>
      <button type="submit">Create Post</button>
    </form>
  );
}

export default CreatePost;
