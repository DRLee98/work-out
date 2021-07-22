"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var DaySchema = new _mongoose["default"].Schema({
  day: {
    type: String,
    required: "Day is required",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User",
  },
  workOuts: [
    {
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: "WorkOut",
    },
  ],
});

var model = _mongoose["default"].model("Day", DaySchema);

var _default = model;
exports["default"] = _default;
