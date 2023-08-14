import jwt from "jsonwebtoken";
import config from "../config/auth.config.js";

const { TokenExpiredError } = jwt;

export const verifyToken = (req, res, next) => {
  const tokenStr = req.headers["x-access-token"];
  if (!tokenStr) {
    return res.status(403).json({
      message: "no_token",
    });
  }
  const tokenArr = tokenStr.split(" ");
  if (tokenArr.length !== 2 || tokenArr[0] !== "bearer") {
    return res.status(403).json({
      message: "invalid_access_token",
    });
  }
  const token = tokenArr[1];
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      if (err instanceof TokenExpiredError) {
        return res.status(401).json({
          message: "access_token_expired",
        });
      } else {
        return res.status(401).json({
          message: "unauthorized",
        });
      }
    }
    req.userId = decoded.id;
    next();
  });
};
