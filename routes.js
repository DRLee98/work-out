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
    changePassword: CHANGE_PASSWORD
  };
  
  export default routes;