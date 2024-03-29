import mongoose from "mongoose";
import moment from "../moment";

const CommentSchema = new mongoose.Schema({
  contents: {
    type: String,
    required: "contents is required",
  },
  createdAt: {
    type: Date,
    default: () => Date.now() + 9 * 60 * 60 * 1000,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reply",
    },
  ],
});

const model = mongoose.model("Comment", CommentSchema);

export default model;
