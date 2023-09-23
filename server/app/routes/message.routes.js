import { index, send, show } from "../controllers/message.controller.js";
import { verifyToken } from "../middleware/authJwt.middleware.js";
import { checkChat, checkMessage } from "../middleware/message.middleware.js";

const messageRoutes = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    next();
  });

  app.get("/api/chats/:chatId/messages", [verifyToken, checkChat], index);

  app.post(
    "/api/chats/:chatId/messages",
    [verifyToken, checkChat, checkMessage],
    send
  );

  app.get("/api/chats/:chatId/messages/:id", [verifyToken, checkChat], show);
};

export default messageRoutes;