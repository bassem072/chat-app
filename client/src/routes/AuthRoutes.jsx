import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { logout, refreshToken } from "../slices/auth";
import TokenService from "../services/token.service";
import axiosInstance from "../services/api";
import Loading from "../Pages/Loading";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export default function AuthRoutes() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(0);
  const user = TokenService.getUser();
  const dispatch = useDispatch();
  const prevRoute = useLocation();

  useEffect(() => {
    if (user) {
      const decodedJwt = parseJwt(user.accessToken);
      if ((decodedJwt.exp - 10) * 1000 < Date.now()) {
        axiosInstance
        .post("/refresh")
        .then((res) => {
            console.log(res);
            const { accessToken } = res.data;

            dispatch(refreshToken(accessToken));

            TokenService.updateLocalAccessToken(accessToken);
            setStatus(1);
            setLoading(false);
          })
          .catch((err) => {
            if (err.response && (err.response.status === 403 || err.response.status === 406)) {
              dispatch(logout());
              console.log(err.response.status);
              setStatus(2);
            } else {
              setStatus(3);
            }
            setLoading(false);
          });
      } else {
        setStatus(1);
        setLoading(false);
      }
    } else {
      setStatus(2);
      setLoading(false);
    }
  }, [dispatch, user]);

  if (loading) {
    return <Loading />;
  } else {
    if (status === 1) {
      return <Outlet />;
    } else if (status === 2) {
      return <Navigate to="/auth" state={{ prevRoute }} replace />;
    } else {
      return <Navigate to="/error500" state={{ prevRoute }} replace />;
    }
  }
}
