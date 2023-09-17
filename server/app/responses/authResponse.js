import jwt from "jsonwebtoken";
import { createRefreshToken } from "../services/refreshToken.service.js";
import authConfig from "../config/auth.config.js";

export const successfullyAuth = async (res, user, remember) => {
  const accessToken = jwt.sign({ id: user._id }, authConfig.secret, {
    expiresIn: authConfig.jwtExpiration,
  });

  const refreshToken = await createRefreshToken(user._id, remember);

  const duration =
    ((remember
      ? authConfig.jwtRefreshExpirationLong
      : authConfig.jwtRefreshExpiration) -
      60) *
    1000;

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    secure: false,
    maxAge: duration,
  });

  return res.status(200).json({
    user: {
      id: user._id,
      name: user.name,
      bio: user.bio,
      email: user.email,
      gender: user.gender,
      birthday: user.birthdate,
      role: user.role,
    },
    accessToken,
    message: "login_successfully",
  });
};
