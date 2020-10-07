import mongoose from "mongoose";

const DaySchema = new mongoose.Schema({
  day: {
    type: String,
    required: "Day is required",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  workOut: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "WorkOut",
  }
});

const model = mongoose.model("Day", DaySchema);
export default model;
