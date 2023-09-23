import User from "../models/user.js";
import { checkRequiredParams } from "./existingParams.middleware.js";

export const checkChat = (req, res, next) => {
  const body = req.body;
  body.users = [req.userId, ...body.users];
  arr.filter((item, index) => arr.indexOf(item) === index);
  if (body.isGroupChat) {
    if (body.users.length < 3) {
      return res
        .status(400)
        .json({ message: "group_chat_must_have_at_least_3_members" });
    } else if (!body.name || body.name.length < 10) {
      return res
        .status(400)
        .json({ message: "group_chat_must_have_at_least_3_members" });
    } else {
      for (const user of body.users) {
        User.exists({ user })
          .then(() => {})
          .catch((_) => {
            return res
              .status(400)
              .send({ message: "can_not_add_this_user", user });
          });
      }
      next();
    }
  } else {
    if (body.users.length !== 2) {
      return res.status(400).json({ message: "invalid_users" });
    } else {
      for (const user of body.users) {
        User.exists({ _id: user })
          .then(() => {})
          .catch((_) => {
            return res
              .status(400)
              .send({ message: "can_not_add_this_user", user });
          });
      }
      next();
    }
  }
};

export const checkUser = (req, res, next) => {
    const userId = req.body.userId;
    if(userId) {
        User.findById(userId)
          .then(() => {
            next();
          })
          .catch((_) => {
            return res.status(404).send({ message: "user_not_found" });
          });
    } else {
        return res.status(400).send({ message: "please_attach_user" });
    }
};