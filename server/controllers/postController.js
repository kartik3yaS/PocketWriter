const Post = require("../models/Post");

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // Sort by createdAt in descending order
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPost = async (req, res) => {
  const post = new Post({
    image: req.body.image,
    caption: req.body.caption,
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Toggle like state
    if (post.isLiked) {
      post.likes -= 1; // Decrement likes
      post.isLiked = false; // Mark as unliked
    } else {
      post.likes += 1; // Increment likes
      post.isLiked = true; // Mark as liked
    }

    const updatedPost = await post.save();
    res.json(updatedPost); // Return updated post with new like count
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
