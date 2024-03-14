const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const postModel = mongoose.model("Post", PostSchema);
module.exports = postModel;
