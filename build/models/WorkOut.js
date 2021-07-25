"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var WorkOutSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: "name is required"
  },
  weight: {
    type: Number,
    "default": 0
  },
  repsOrHold: {
    type: String,
    required: "repsOrHold is required"
  },
  count: {
    type: Number,
    required: "count is required"
  },
  set: {
    type: Number,
    "default": 1
  },
  breakTime: {
    type: Number,
    "default": 60
  },
  createdAt: {
    type: Date,
    "default": Date.now
  },
  creator: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  },
  day: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Day"
  }
});

var model = _mongoose["default"].model("WorkOut", WorkOutSchema);

var _default = model;
exports["default"] = _default;