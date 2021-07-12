import mongoose from "mongoose";

const CompleteDateSchema = new mongoose.Schema({
  date: [
    {
      type: Date,
      required: "date is required",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const model = mongoose.model("CompleteDate", CompleteDateSchema);
export default model;
