import axios from "axios";
import TokenService from "./token.service";
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const webRedirectUrl = process.env.WEB_BASE_URL;

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token; // for Spring Boot back-end
      // config.headers["x-access-token"] = token; // for Node.js Express back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/auth/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const data = TokenService.getLocalRefreshToken();
          const rs = await instance.post("/auth/refershToken", data);
          const token = await rs.data.data;
          TokenService.updateLocalAccessToken(token);
          return instance(originalConfig);
        } catch (_error) {
          if (_error.response.status === 400) {
            localStorage.removeItem("user");
            window.location.href = webRedirectUrl;
          }
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);
export default instance;
