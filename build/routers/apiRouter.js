"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _postController = require("../controllers/postController");

var _userController = require("../controllers/userController");

var _workOutController = require("../controllers/workOutController");

var _middlewares = require("../middlewares");

var _routes = _interopRequireDefault(require("../routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var apiRouter = _express["default"].Router();

apiRouter.post(_routes["default"].addWorkOut, _workOutController.postAddWorkOut);
apiRouter.post(_routes["default"].editWorkOut, _workOutController.postEditWorkOut);
apiRouter.post(_routes["default"].deleteWorkOut, _workOutController.postDeleteWorkOut);
apiRouter.post(_routes["default"].changeOrder, _workOutController.postChangeOrder);
apiRouter.post(_routes["default"].addComment(), _middlewares.onlyPrivate, _postController.postAddComment);
apiRouter.post(_routes["default"].addReply(), _middlewares.onlyPrivate, _postController.postAddReply);
apiRouter.post(_routes["default"].likePost(), _middlewares.onlyPrivate, _postController.postToggleLike);
apiRouter.post(_routes["default"].addCompleteDate, _middlewares.onlyPrivate, _userController.postAddCompleteDate);
apiRouter.post(_routes["default"].getCompleteDate, _middlewares.onlyPrivate, _userController.postGetCompleteDate);
var _default = apiRouter;
exports["default"] = _default;