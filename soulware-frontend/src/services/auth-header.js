import axios from "axios";

const url = "http://localhost:8000/accounts/";

export default function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    axios.post(url + "verify", { token: user.token }).then(
      (response) => {},
      (error) => {
        axios.post(url + "refresh", { token: user.token }).then(
          (response) => {
            if (response.data.token) {
              localStorage.setItem("user", JSON.stringify(response.data));
            }
          },
          (error) => {
            return {};
          }
        );
      }
    );
    return { Authorization: "Bearer " + user.token };
  } else return {};
}
