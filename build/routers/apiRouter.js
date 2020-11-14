"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _workOutController = require("../controllers/workOutController");

var _routes = _interopRequireDefault(require("../routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var apiRouter = _express["default"].Router();

apiRouter.post(_routes["default"].addWorkOut, _workOutController.postAddWorkOut);
apiRouter.post(_routes["default"].editWorkOut, _workOutController.postEditWorkOut);
apiRouter.post(_routes["default"].deleteWorkOut, _workOutController.postDeleteWorkOut);
apiRouter.post(_routes["default"].changeOrder, _workOutController.postChangeOrder);
var _default = apiRouter;
exports["default"] = _default;