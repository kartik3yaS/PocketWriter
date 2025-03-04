import React, { useState } from "react";
import axios from "axios";
import "../styles/CreatePost.css";

function CreatePost({ onPostCreated }) {
  const [imageURL, setImageURL] = useState("");
  const [caption, setCaption] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const url = e.target.value;
    setImageURL(url);

    if (url) {
      setPreviewImage(url);
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageURL || !caption) {
      alert("Please provide both an image URL and a caption.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/posts", {
        image: imageURL,
        caption,
      });

      onPostCreated(response.data);
      setImageURL("");
      setCaption("");
      setPreviewImage(null);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Image URL"
        value={imageURL}
        onChange={handleImageChange}
        required
      />
      <textarea
        placeholder="Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        required
      ></textarea>

      {previewImage && (
        <div className="image-preview">
          <img src={previewImage} alt="Preview" />
        </div>
      )}

      <button type="submit">Create Post</button>
    </form>
  );
}

export default CreatePost;
