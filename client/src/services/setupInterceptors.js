import axiosInstance from "./api";
import TokenService from "./token.service";
import { refreshToken, logout } from "../slices/auth";

const setup = (store) => {
  const { dispatch } = store;

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      console.log("This is " + token);
      if (token) {
        config.headers["x-access-token"] = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalConfig = error.config;

      if (
        error.response &&
        error.response.status === 403 &&
        !originalConfig._retry
      ) {
        originalConfig._retry = true;

        try {
          const res = await axiosInstance.post("/refresh");
          console.log(res);

          if (res.status === 200){
            const { accessToken } = res.data;

            dispatch(refreshToken(accessToken));

            TokenService.updateLocalAccessToken(accessToken);

            return axiosInstance(originalConfig);
          } else if (res.status === 406) {
            dispatch(logout());
            window.location.reload();
            return Promise.reject(error);
          }

          
        } catch (err) {
          dispatch(logout());
          window.location.reload();
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default setup;
