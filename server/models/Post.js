const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    caption: { type: String, required: true },
    likes: { type: Number, default: 0 },
    isLiked: { type: Boolean, default: false },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model("Post", postSchema);
