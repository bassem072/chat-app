import { Route, Routes } from "react-router-dom";

import "./App.css";
import Auth from "./Pages/Auth";
import AuthRoutes from "./routes/AuthRoutes";
import GuestRoutes from "./routes/GuestRoutes";
import User from "./Pages/User";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
//import Chat from "./Pages/Chat";

function App() {
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "259047599819002",
        cookie: true,
        xfbml: true,
        version: "v18.0",
      });

      window.FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);
  return (
    <div className="flex flex-col font-archivo text-paragraph items-center justify-center w-full min-h-screen max-h-screen flex-1 text-center bg-primary">
      <Routes>
        <Route path="/" element={<AuthRoutes />}>
          <Route index element={<User />} />
        </Route>
        <Route
          path="/auth"
          element={
            <GuestRoutes>
              <Auth />
            </GuestRoutes>
          }
        />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
