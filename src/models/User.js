import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatarUrl: String,
  completeDates: [
    {
      year: Number,
      month: Number,
      date: Number,
    },
  ],
  days: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Day",
    },
  ],
  workOuts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkOut",
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  likesPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);

export default model;
