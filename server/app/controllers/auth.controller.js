import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import authConfig from "../config/auth.config.js";
import User from "../models/user.js";
import RefreshToken from "../models/refreshToken.js";
import {
  createRefreshToken,
  verifyExpirationRefreshToken,
} from "../services/refreshToken.service.js";
import { expireDate } from "../helpers/expireDate.helper.js";
import { successfullyAuth } from "../responses/authResponse.js";

export const register = (req, res) => {
  const { name, bio, email, password, gender, birthdate } = req.body;

  const user = new User({
    name,
    bio,
    email,
    password,
    gender,
    birthdate,
    profileImage: gender === "male" ? "male.png" : "female.png",
    role: "user",
  });

  user
    .save()
    .then(async (newUser) => {
      successfullyAuth(res, newUser, false);
    })
    .catch((err) => {
      return res.status(400).json({ message: "user_not_saved", error: err });
    });
};

export const login = (req, res) => {
  const { email, password, remember = false } = req.body;

  User.findOne({ email: email })
    .then(async (user) => {
      if (!user) return res.status(404).json({ message: "user_not_found" });

      if (!user.password) {
        return res.status(404).send({ message: "didn't_have_password" });
      }

      const isMatch = bcrypt.compareSync(password, user.password);

      if (!isMatch)
        return res.status(401).json({ message: "password_not_match" });

      successfullyAuth(res, user, remember);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

export const socialLogin = (req, res) => {
  const { email } = req.body;

  User.findOne({ email: email })
    .then(async (user) => {
      if (!user) return res.status(404).json({ message: "user_not_found" });

      successfullyAuth(res, user, false);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

export const logout = (req, res) => {
  if (req.cookies?.jwt) {
    RefreshToken.findOneAndDelete({ token: req.cookies.jwt })
      .exec()
      .then((token) => {
        return res
          .status(200)
          .json({ message: "refresh_token_deleted_successfully" });
      })
      .catch((err) => {
        return res.status(406).json({ message: "refresh_token_not_found" });
      });
  } else {
    return res.status(406).json({ message: "unauthorized" });
  }
};

export const refreshAccessToken = async (req, res) => {
  if (req.cookies?.jwt) {
    RefreshToken.findOne({ token: req.cookies.jwt })
      .then((refreshToken) => {
        if (!verifyExpirationRefreshToken(refreshToken)) {
          RefreshToken.findByIdAndDelete(refreshToken._id)
            .exec()
            .then((_) => {
              return res.status(400).json({ message: "Refresh_token_expired" });
            })
            .catch((_) => {
              return res.status(400).json({ message: "Refresh_token_expired" });
            });
        }

        const expiryDate = expireDate(refreshToken.remember);

        refreshToken.expiryDate = expiryDate;

        const accessToken = jwt.sign(
          { id: refreshToken.user },
          authConfig.secret,
          {
            expiresIn: authConfig.jwtExpiration,
          }
        );

        refreshToken
          .save()
          .then((newRefreshToken) => {
            const duration =
              ((newRefreshToken.remember
                ? authConfig.jwtRefreshExpirationLong
                : authConfig.jwtRefreshExpiration) -
                60) *
              1000;

            res.cookie("jwt", req.cookies.jwt, {
              httpOnly: true,
              sameSite: "None",
              secure: false,
              maxAge: duration,
            });
            return res.status(200).json({
              accessToken: accessToken,
            });
          })
          .catch(() => {
            return res.status(200).json({
              accessToken: accessToken,
              refreshToken: refreshToken.token,
            });
          });
      })
      .catch((err) => {
        return res
          .status(404)
          .json({ message: "refresh_token_not_found", error: err });
      });
  } else {
    return res.status(406).json({ message: "unauthorized" });
  }
};
