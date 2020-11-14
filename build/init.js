"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

require("./db");

var _app = _interopRequireDefault(require("./app"));

require("./models/User");

require("./models/Day");

require("./models/WorkOut");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var PORT = process.env.PORT || 4000;

var handleListening = function handleListening() {
  return console.log("\u2705  Listening on: http://localhost:".concat(PORT));
};

_app["default"].listen(PORT, handleListening);