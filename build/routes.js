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
var EDIT_PROFILE = "/edit-profile";
var CHANGE_PASSWORD = "/change-password"; //Work Out

var WORKOUT = "/work-out";
var DAY = "/day";
var ADD = "/add";
var EDIT_DAY = "/:id/day-edit"; //API

var API = "/api";
var ADD_WORKOUT = "/add-item";
var EDIT_WORKOUT = "/:id/edit";
var DELETE_WORKOUT = "/:id/delete";
var CHANGE_ORDER = "/:id/change-order";
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
  editProfile: EDIT_PROFILE,
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
  changeOrder: CHANGE_ORDER
};
var _default = routes;
exports["default"] = _default;