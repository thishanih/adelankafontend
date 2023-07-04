class TokenService {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    const data = {
      id: user.id,
      refreshToken: user.refreshToken,
    };
    return data;
  }

  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user.access;
  }

  updateLocalAccessToken(access) {
    let user = JSON.parse(localStorage.getItem("user"));
    user.access = access;
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  setUser(user) {
    console.log(JSON.stringify(user));
    localStorage.setItem("user", JSON.stringify(user));
  }
}
export default new TokenService();
