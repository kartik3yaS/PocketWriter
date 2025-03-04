const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const {
  getPosts,
  createPost,
  deletePost,
  likePost,
} = require("../controllers/postController");
const {
  getComments,
  createComments,
} = require("../controllers/commentController");

router.get("/", getPosts);
router.post("/", createPost);
router.delete("/:id", deletePost);
router.patch("/:id/toggle-like", likePost);
router.get("/:id/comments", getComments);
router.post("/:id/comments", createComments);

module.exports = router;
