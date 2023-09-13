import api from "./api";
import TokenService from "./token.service";

const API_URL = "http://localhost:5000/api/";

const register = async (email, password, name, bio, gender, birthday) => {
  return await api
    .post(API_URL + "register", {
      email,
      password,
      name,
      bio,
      gender,
      birthday,
    })
    .then((response) => {
      if (response.data.accessToken) {
        TokenService.setUser(response.data);
        console.log("User Added");
      }
      return response.data;
    });
};

const login = async (email, password, remember) => {
  console.log(email, password, remember);
  return await api
    .post(API_URL + "login", {
      email,
      password,
      remember,
    })
    .then((response) => {
      if (response.data.accessToken) {
        console.log("this is your data ", response.data.accessToken);
        console.log(response.data);
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
  logout,
  getCurrentUser,
};

export default authService;
