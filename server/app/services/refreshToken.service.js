import { v4 as uuidv4 } from "uuid";
import refreshToken from "../models/refreshToken.js";
import { expireDate } from "../helpers/expireDate.helper.js";

export const createRefreshToken = async (user, remember) => {
  try {
    const expiryDate = expireDate(remember);

    const _token = uuidv4();
    const refreshTokenObject = new refreshToken({
      token: _token,
      user,
      expiryDate,
      remember,
    });
    await refreshTokenObject.save();
    return refreshTokenObject.token;
  } catch (err) {
    return "error_refresh_token";
  }
};

export const verifyExpirationRefreshToken = (token) => {
  const currentDate = new Date();
  return token.expiryDate.getTime() > currentDate.getTime();
};

export const deleteAllExpiredRefreshTokens = () => {
  const currentDate = new Date();
  refreshToken
    .deleteMany({
      expiryDate: {
        $lt: currentDate,
      },
    })
    .exec()
    .then(() => {
      console.log("Deleting expired refresh tokens");
    })
    .catch((err) => {
      console.log("can't delete expired refresh tokens");
    });
};
