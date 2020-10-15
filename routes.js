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
const ADD_WORKOUT = "/add";
const EDIT_DAY = "/:id/day-edit";
const EDIT_WORKOUT = "/:id/edit";
const DELETE_WORKOUT = "/:id/delete"

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
    addWorkOut: ADD_WORKOUT,
    editDay: (id) => {
      if(id){
        return `/work-out/${id}/day-edit`
      } else {
        return EDIT_WORKOUT
      }
    },
    editWorkOut: (id) => {
      if(id){
        return `/work-out/${id}/edit`
      } else {
        return EDIT_WORKOUT
      }
    },
    deleteWorkOut: (id) => {
      if(id){
        return `/work-out/${id}/delete`
      } else {
        return DELETE_WORKOUT
      }
    }
  };
  
  export default routes;