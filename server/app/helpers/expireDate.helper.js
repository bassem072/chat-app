import authConfig from "../config/auth.config.js";

export const expireDate = (remember) => {
  const duration = remember
    ? authConfig.jwtRefreshExpirationLong
    : authConfig.jwtRefreshExpiration;
  const expiryDate = new Date();
  expiryDate.setSeconds(expiryDate.getSeconds() + duration);
  return expiryDate;
};
