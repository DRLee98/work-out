import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  days: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Day",
  }],
  workOuts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "WorkOut",
  }]
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);

export default model;
