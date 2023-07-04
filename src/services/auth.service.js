import axios from "axios";
const API_URL = process.env.REACT_APP_API_BASE_URL;
class UserService {
  login(data) {
    return axios.post(API_URL + `/auth/login`, data);
  }
}
export default new UserService();
