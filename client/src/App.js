import { Route, Routes } from "react-router-dom";

import "./App.css";
import Auth from "./Pages/Auth";
import AuthRoutes from "./routes/AuthRoutes";
import GuestRoutes from "./routes/GuestRoutes";
import User from "./Pages/User";
//import Chat from "./Pages/Chat";

function App() {
  return (
    <div className="flex flex-col font-archivo text-paragraph items-center justify-center w-full min-h-screen max-h-screen flex-1 text-center bg-primary">
      <Routes>
        <Route path="/" element={<AuthRoutes />}>
          <Route
            index
            element={
              <User />
            }
          />
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
    </div>
  );
}

export default App;
