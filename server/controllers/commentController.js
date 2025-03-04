const Comment = require("../models/Comment");

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.id });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createComments = async (req, res) => {
  try {
    const comment = new Comment({
      text: req.body.text,
      postId: req.params.id,
    });
    const savedComment = await comment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
