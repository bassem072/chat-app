import { store } from "../controllers/chat.controller.js";
import { verifyToken } from "../middleware/authJwt.middleware.js";
import { checkRequiredParams } from "../middleware/existingParams.middleware.js";
import { checkUsers } from "../middleware/user.middleware.js";

const chatRoutes = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/chat", [verifyToken]);
  
  app.post("/api/chat", [verifyToken, checkRequiredParams(['users']), checkUsers], store);
  app.post("/api/groupChat", [verifyToken, checkRequiredParams(['name', 'users']), checkUsers], store);
};
