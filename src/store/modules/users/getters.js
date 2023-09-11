import { TOKEN, USER } from "../../../config";

export default {
  loggedIn() {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      return true;
    } else {
      return false;
    }
  },
  loggedInUser () {
    const user = JSON.parse(localStorage.getItem(USER, ''));
    return user;
  },
}