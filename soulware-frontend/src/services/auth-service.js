import localforage from "localforage";
import http from "@/utils/http";

class AuthService {
  async login(user) {
    return await http
      .process("auth", "login", {
        email: user.email,
        password: user.password,
      })
      .then((data) => {
        let token = data.token;
        localforage.setItem("token", token).then(function(token) {
          console.log("create", token);
        });
        return token;
      });
  }
  async refresh(token) {
    return await http
      .process("auth", "refresh", {
        token: token,
      })
      .then((data) => {
        let newToken = data.token;
        localforage.setItem("token", newToken).then(function(newToken) {
          console.log("refresh", newToken);
        });
        return newToken;
      });
  }
}
export default new AuthService();
