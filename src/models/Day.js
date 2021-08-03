import mongoose from "mongoose";
import moment from "moment-timezone";

const DaySchema = new mongoose.Schema({
  day: {
    type: String,
    required: "Day is required",
  },
  createdAt: {
    type: Date,
    default: () => moment(new Date()).format(),
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  workOuts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkOut",
    },
  ],
});

const model = mongoose.model("Day", DaySchema);
export default model;
