//Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search"

//User
const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";

//Work Out
const WORKOUT = "/work-out";
const DAY = "/day";
const ADD = "/add";
const EDIT_DAY = "/:id/day-edit";
const DELETE_WORKOUT = "/:id/delete"

//API
const API = "/api";
const ADD_WORKOUT = "/add-item";
const EDIT_WORKOUT = "/:id/edit";

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
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSWORD,
    workOut: WORKOUT,
    day: DAY,
    add: ADD,
    editDay: (id) => {
      if(id){
        return `/work-out/${id}/day-edit`
      } else {
        return EDIT_DAY
      }
    },
    deleteWorkOut: (id) => {
      if(id){
        return `/work-out/${id}/delete`
      } else {
        return DELETE_WORKOUT
      }
    },
    api: API,
    addWorkOut: ADD_WORKOUT,
    editWorkOut: EDIT_WORKOUT
  };
  
  export default routes;