import React from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import TokenService from "../services/token.service";
import axiosInstance from "../services/api";
import { logout, refreshToken } from "../slices/auth";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export default function GuestRoutes({ children }) {
  const user = TokenService.getUser();
  const dispatch = useDispatch();

  if (user) {
    const decodedJwt = parseJwt(user.accessToken);

    if (decodedJwt.exp * 1000 < Date.now()) {
      axiosInstance
        .post("/refresh")
        .then((res) => {
          const { accessToken } = res.data;
          dispatch(refreshToken(accessToken));

          TokenService.updateLocalAccessToken(accessToken);
          return <Navigate to="/" replace />;
        })
        .catch((error) => {
          if (error.status === 403) {
            dispatch(logout());
            return children;
          } else {
            return <Navigate to="/error500" replace />;
          }
        });
    } else {
      return <Navigate to="/" replace />;
    }
  } else {
    return children;
  }
}
