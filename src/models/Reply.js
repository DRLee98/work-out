import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema({
  contents: {
    type: String,
    required: "contents is required",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
});

const model = mongoose.model("Reply", ReplySchema);
export default model;
