import { USER } from "../../../config";

export default {
  SET_LOGGED_IN(state, loggedIn) {
      state.loggedIn = loggedIn;
  },
  SET_LOGGED_IN_USER(state, user) {
      state.loggedInUser = user;
      if (user) {
        localStorage.setItem(USER, JSON.stringify(user));
      }
      else {
        localStorage.removeItem(USER);
      }
  },
}