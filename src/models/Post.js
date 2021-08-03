import mongoose from "mongoose";
import moment from "moment-timezone";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "title is required",
  },
  contents: {
    type: String,
    required: "contents is required",
  },
  imageUrls: [String],
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: () => moment(new Date()).format(),
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

PostSchema.static("isLiked", (id, list = []) => list.includes(id));

PostSchema.static("toggleLike", (id, list = []) => {
  const isLiked = list.includes(id);
  if (isLiked) {
    list = list.filter((item) => item.toString() !== id.toString());
  } else {
    list.push(id);
  }
  return list;
});

const model = mongoose.model("Post", PostSchema);

export default model;
