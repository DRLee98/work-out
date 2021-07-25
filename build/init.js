"use strict";

require("@babel/polyfill");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _moment = _interopRequireDefault(require("moment"));

require("moment-timezone");

require("./db");

var _app = _interopRequireDefault(require("./app"));

require("./models/User");

require("./models/Day");

require("./models/WorkOut");

require("./models/Post");

require("./models/Comment");

require("./models/Reply");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

_moment["default"].tz.setDefault("Asia/Seoul");

var PORT = process.env.PORT || 4000;

var handleListening = function handleListening() {
  return console.log("\u2705  Listening on: http://localhost:".concat(PORT));
};

_app["default"].listen(PORT, handleListening);