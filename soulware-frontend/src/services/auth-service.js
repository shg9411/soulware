import axios from "axios";
import localforage from "localforage";

const URL = process.env.VUE_APP_API_SERVER;

class AuthService {
  async login(user) {
    return axios
      .post(URL + "/accounts/login", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        let token = response.data.token;
        localforage.setItem("token", token).then(function(token) {
          console.log("create", token);
        });
        return token;
      });
  }
  async refresh(token) {
    return axios
      .post(URL + "/accounts/refresh", {
        token: token,
      })
      .then((response) => {
        let newToken = response.data.token;
        localforage.setItem("token", newToken).then(function(newToken) {
          console.log("refresh", newToken);
        });
        return newToken;
      });
  }
}
export default new AuthService();
