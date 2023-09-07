import {
  login,
  logout,
  refreshAccessToken,
  register,
} from "../controllers/auth.controller.js";
import { checkRequiredParams } from "../middleware/existingParams.middleware.js";
import { checkDuplicateEmail } from "../middleware/verifySignUp.middleware.js";

const authRoutes = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    next();
  });

  app.post(
    "/api/register",
    [
      checkRequiredParams([
        "name",
        "email",
        "password",
        "gender",
        "birthdate",
      ]),
      checkDuplicateEmail,
    ],
    register
  );

  app.post(
    "/api/login",
    [checkRequiredParams(["email", "password"])],
    login
  );

  app.post("/api/logout", logout);

  app.post(
    "/api/refresh",
    refreshAccessToken
  );
};

export default authRoutes;
