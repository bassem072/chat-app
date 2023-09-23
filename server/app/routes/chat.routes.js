import {
  RemoveAdminFromGroup,
  RemoveUserFromGroup,
  addAdminToGroup,
  addUserToGroup,
  clear,
  destroy,
  indexChats,
  indexGroupChats,
  show,
  store,
  update,
} from "../controllers/chat.controller.js";
import { verifyToken } from "../middleware/authJwt.middleware.js";
import { checkChat, checkUser } from "../middleware/chat.middleware.js";
import { checkRequiredParams } from "../middleware/existingParams.middleware.js";

const chatRoutes = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/chats", [verifyToken], indexChats);
  app.get("/api/groups", [verifyToken], indexGroupChats);

  app.post("/api/chats", [verifyToken, checkChat], store);

  app.get("/api/chats/:id", [verifyToken], show);
  app.put(
    "/api/chats/:id",
    [verifyToken, checkRequiredParams(["name"])],
    update
  );
  app.delete("/api/chats/:id", [verifyToken], destroy);
  app.delete("/api/chats/:id/clear", [verifyToken], clear);

  app.post("/api/chats/:id/add_user", [verifyToken, checkUser], addUserToGroup);
  app.post(
    "/api/chats/:id/remove_user",
    [verifyToken, checkUser],
    RemoveUserFromGroup
  );
  app.post(
    "/api/chats/:id/add_admin",
    [verifyToken, checkUser],
    addAdminToGroup
  );
  app.post(
    "/api/chats/:id/remove_admin",
    [verifyToken, checkUser],
    RemoveAdminFromGroup
  );
};
