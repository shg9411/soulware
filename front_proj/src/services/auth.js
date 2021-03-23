import axios from "axios";

const url = "http://127.0.0.1:8000/accounts/login";

class AuthService {
  login(user) {
    return axios
      .post(url, {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
}
export default new AuthService();
