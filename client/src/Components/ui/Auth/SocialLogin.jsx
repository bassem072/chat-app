import SocialButton from "./FormFields/SocialButton";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { clearMessage, setMessage } from "../../../slices/message";
import { useEffect } from "react";
import { googleApi } from "../../../services/oauthApis";
import { changeRegister, changeRegisterData, socialLogin } from "../../../slices/auth";

export default function SocialLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const GoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await googleApi(tokenResponse.access_token);

      dispatch(setMessage(""));
      const { email } = userInfo;
      dispatch(socialLogin({ email }))
        .unwrap()
        .then(() => {
          if (location.state && location.state.prevRoute) {
            navigate(location.state.prevRoute);
          } else {
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(userInfo);
          const userData = {};
          userData.name = userInfo.name;
          userData.email = userInfo.email;
          dispatch(changeRegisterData(userData));
          dispatch(changeRegister(true));
        });

      console.log(userInfo);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const responseFacebook = (response) => {
    console.log(response);
    window.FB.api(
      "/me",
      "GET",
      { fields: "email,birthday,gender,id,name" },
      function (userInfo) {
        console.log(userInfo);
        dispatch(setMessage(""));
        const { email } = userInfo;
        dispatch(socialLogin({ email }))
          .unwrap()
          .then(() => {
            if (location.state && location.state.prevRoute) {
              navigate(location.state.prevRoute);
            } else {
              navigate("/");
            }
          })
          .catch((err) => {
            console.log(userInfo);
            const userData = {};
            userData.name = userInfo.name;
            userData.email = userInfo.email;
            dispatch(changeRegisterData(userData));
            dispatch(changeRegister(true));
          });
      }
    );
  };

  return (
    <div className="flex flex-col items-center">
      <p className="py-3 text-base">Or Sign In With Social Accounts</p>
      <div className="flex gap-4">
        <FacebookLogin
          appId="259047599819002"
          autoLoad
          callback={responseFacebook}
          render={(renderProps) => (
            <SocialButton icon={faFacebookF} onClick={renderProps.onClick} />
          )}
        />
        <SocialButton icon={faGoogle} onClick={() => GoogleLogin()} />
      </div>
    </div>
  );
}
