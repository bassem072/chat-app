import api from "./api";
import TokenService from "./token.service";

const API_URL = "http://localhost:5000/api/";

const register = async (userData) => {
  return await api
    .post(API_URL + "register", userData)
    .then((response) => {
      if (response.data.accessToken) {
        TokenService.setUser(response.data);
      }
      return response.data;
    });
};

const login = async (email, password, remember) => {
  return await api
    .post(API_URL + "login", {
      email,
      password,
      remember,
    })
    .then((response) => {
      if (response.data.accessToken) {
        TokenService.setUser(response.data);
      }
      return response.data;
    });
};

const socialLogin = async (email, password, remember) => {
  return await api
    .post(API_URL + "social", {
      email,
    })
    .then((response) => {
      if (response.data.accessToken) {
        TokenService.setUser(response.data);
      }
      return response.data;
    });
};

const logout = async () => {
  return api
    .post(API_URL + "logout")
    .then((response) => {
      if (response.status === 200) {
        console.log("Logout Successfully");
        TokenService.removeUser();
      }
      return response.data;
    })
    .catch((err) => {
      console.log(err.response);
      if (err.response.status === 400 || err.response.status === 406) {
        TokenService.removeUser();
      }
    });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  register,
  login,
  socialLogin,
  logout,
  getCurrentUser,
};

export default authService;
