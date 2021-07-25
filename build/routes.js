"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
//Global
var HOME = "/";
var JOIN = "/join";
var LOGIN = "/login";
var LOGOUT = "/logout";
var SEARCH = "/search"; //User

var USERS = "/users";
var USER_DETAIL = "/:id";
var EDIT_PROFILE = "/:id/edit-profile";
var CHANGE_PASSWORD = "/change-password"; //Work Out

var WORKOUT = "/work-out";
var DAY = "/day";
var ADD = "/add";
var EDIT_DAY = "/:id/day-edit";
var CALENDAR = "/calendar"; //Post

var POST = "/post";
var POST_DETAIL = "/:id";
var ADD_POST = "/add-post";
var EDIT_POST = "/:id/edit-post";
var DELETE_POST = "/:id/delete-post"; //API

var API = "/api";
var ADD_WORKOUT = "/add-item";
var EDIT_WORKOUT = "/:id/edit";
var DELETE_WORKOUT = "/:id/delete";
var CHANGE_ORDER = "/:id/change-order";
var LIKE_POST = "/:id/like";
var ADD_COMMENT = "/:id/add-comment";
var ADD_REPLY = "/:id/add-reply";
var ADD_COMPLETE_DATE = "/add-complete-date";
var GET_COMPLETE_DATE = "/get-complete-date";
var routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: function userDetail(id) {
    if (id) {
      return "/users/".concat(id);
    } else {
      return USER_DETAIL;
    }
  },
  editProfile: function editProfile(id) {
    if (id) {
      return "/users/".concat(id, "/edit-profile");
    } else {
      return EDIT_PROFILE;
    }
  },
  changePassword: CHANGE_PASSWORD,
  workOut: WORKOUT,
  day: DAY,
  add: ADD,
  editDay: function editDay(id) {
    if (id) {
      return "/work-out/".concat(id, "/day-edit");
    } else {
      return EDIT_DAY;
    }
  },
  api: API,
  addWorkOut: ADD_WORKOUT,
  editWorkOut: EDIT_WORKOUT,
  deleteWorkOut: DELETE_WORKOUT,
  changeOrder: CHANGE_ORDER,
  post: POST,
  postDetail: function postDetail(id) {
    if (id) {
      return "/post/".concat(id);
    } else {
      return POST_DETAIL;
    }
  },
  addPost: ADD_POST,
  editPost: EDIT_POST,
  deletePost: function deletePost(id) {
    if (id) {
      return "/post/".concat(id, "/delete-post");
    } else {
      return DELETE_POST;
    }
  },
  likePost: function likePost(id) {
    if (id) {
      return "/api/".concat(id, "/like");
    } else {
      return LIKE_POST;
    }
  },
  addComment: function addComment(id) {
    if (id) {
      return "/api/".concat(id, "/add-comment");
    } else {
      return ADD_COMMENT;
    }
  },
  addReply: function addReply(id) {
    if (id) {
      return "/api/".concat(id, "/add-reply");
    } else {
      return ADD_REPLY;
    }
  },
  addCompleteDate: ADD_COMPLETE_DATE,
  getCompleteDate: GET_COMPLETE_DATE,
  calendar: CALENDAR
};
var _default = routes;
exports["default"] = _default;