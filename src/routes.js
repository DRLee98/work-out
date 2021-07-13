//Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

//User
const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/:id/edit-profile";
const CHANGE_PASSWORD = "/change-password";

//Work Out
const WORKOUT = "/work-out";
const DAY = "/day";
const ADD = "/add";
const EDIT_DAY = "/:id/day-edit";

//Post
const POST = "/post";
const POST_DETAIL = "/:id";
const ADD_POST = "/add-post";
const EDIT_POST = "/:id/edit-post";

//API
const API = "/api";
const ADD_WORKOUT = "/add-item";
const EDIT_WORKOUT = "/:id/edit";
const DELETE_WORKOUT = "/:id/delete";
const CHANGE_ORDER = "/:id/change-order";
const DELETE_POST = "/:id/delete";
const LIKE_POST = "/:id/like";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: (id) => {
    if (id) {
      return `/users/${id}`;
    } else {
      return USER_DETAIL;
    }
  },
  editProfile: (id) => {
    if (id) {
      return `/users/${id}/edit-profile`;
    } else {
      return EDIT_PROFILE;
    }
  },
  changePassword: CHANGE_PASSWORD,
  workOut: WORKOUT,
  day: DAY,
  add: ADD,
  editDay: (id) => {
    if (id) {
      return `/work-out/${id}/day-edit`;
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
  postDetail: (id) => {
    if (id) {
      return `/post/${id}`;
    } else {
      return POST_DETAIL;
    }
  },
  addPost: ADD_POST,
  editPost: EDIT_POST,
  deletePost: DELETE_POST,
  likePost: LIKE_POST,
};

export default routes;
