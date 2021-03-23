import axios from "axios";
import authHeader from "./auth-header";

let url = "http://localhost:8000/boards/";

class UserService {
  getBoard() {
    return axios.get(url + "board", { headers: authHeader() });
  }
}
export default new UserService();
