import mongoose from "mongoose";
import moment from "moment-timezone";

const ReplySchema = new mongoose.Schema({
  contents: {
    type: String,
    required: "contents is required",
  },
  createdAt: {
    type: Date,
    default: () => moment(new Date()).format(),
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
