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
const CALENDAR = "/calendar";

//Post
const POST = "/post";
const POST_DETAIL = "/:id";
const ADD_POST = "/add-post";
const EDIT_POST = "/:id/edit-post";
const DELETE_POST = "/:id/delete-post";

//API
const API = "/api";
const ADD_WORKOUT = "/add-item";
const EDIT_WORKOUT = "/:id/edit";
const DELETE_WORKOUT = "/:id/delete";
const CHANGE_ORDER = "/:id/change-order";
const LIKE_POST = "/:id/like";
const ADD_COMMENT = "/:id/add-comment";
const ADD_REPLY = "/:id/add-reply";
const ADD_COMPLETE_DATE = "/add-complete-date";
const GET_COMPLETE_DATE = "/get-complete-date";

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
  deletePost: (id) => {
    if (id) {
      return `/post/${id}/delete-post`;
    } else {
      return DELETE_POST;
    }
  },
  likePost: (id) => {
    if (id) {
      return `/api/${id}/like`;
    } else {
      return LIKE_POST;
    }
  },
  addComment: (id) => {
    if (id) {
      return `/api/${id}/add-comment`;
    } else {
      return ADD_COMMENT;
    }
  },
  addReply: (id) => {
    if (id) {
      return `/api/${id}/add-reply`;
    } else {
      return ADD_REPLY;
    }
  },
  addCompleteDate: ADD_COMPLETE_DATE,
  getCompleteDate: GET_COMPLETE_DATE,
  calendar: CALENDAR,
};

export default routes;
