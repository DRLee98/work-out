"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _workOutController = require("../controllers/workOutController");

var _middlewares = require("../middlewares");

var _routes = _interopRequireDefault(require("../routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var workOutRouter = _express["default"].Router();

workOutRouter.get(_routes["default"].day, _middlewares.onlyPrivate, _workOutController.getDayWorkOut);
workOutRouter.get(_routes["default"].add, _middlewares.onlyPrivate, _workOutController.getAdd);
workOutRouter.get(_routes["default"].editDay(), _middlewares.onlyPrivate, _workOutController.getEditDay);
workOutRouter.post(_routes["default"].editDay(), _middlewares.onlyPrivate, _workOutController.postEditDay);
var _default = workOutRouter;
exports["default"] = _default;