import axios from "axios";
import localforage from "localforage";

const url = "http://127.0.0.1:8000/accounts/";

class AuthService {
  async login(user) {
    return axios
      .post(url + "login", {
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
      .post(url + "refresh", {
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
