import User from "../models/user.js";

export const checkUsers = (req, res, next) => {
  const { users } = req.body;
  if (typeof users !== "object" || users.length === 0) {
    return res.status(400).json({ message: "user_not_found" });
  }
  let b = true;
  for (let i = 0; i < users.length; i++) {
    User.findById(users[i])
      .then((_) => {})
      .catch((_) => {
        b = false;
      });
    if (!b) break;
  }
  if (b) return next();
  else return res.status(400).json({ message: "user_not_found" });
};
