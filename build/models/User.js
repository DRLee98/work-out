"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _passportLocalMongoose = _interopRequireDefault(require("passport-local-mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var UserSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  avatarUrl: String,
  completeDates: [{
    year: {
      type: Number,
      max: 9999
    },
    month: {
      type: Number,
      min: 1,
      max: 12
    },
    date: {
      type: Number,
      min: 1,
      max: 31
    }
  }],
  days: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Day"
  }],
  workOuts: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "WorkOut"
  }],
  posts: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Post"
  }],
  likesPosts: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Post"
  }]
});
UserSchema.plugin(_passportLocalMongoose["default"], {
  usernameField: "email"
});

var model = _mongoose["default"].model("User", UserSchema);

var _default = model;
exports["default"] = _default;