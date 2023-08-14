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
      console.log(newUser._id, authConfig.secret, authConfig.jwtExpiration);
      const accessToken = jwt.sign({ id: newUser._id }, authConfig.secret, {
        expiresIn: authConfig.jwtExpiration,
      });
      
      console.log(2);
      const refreshToken = await createRefreshToken(newUser._id, false);
      console.log(3);

      return res.status(200).json({
        message: "register_successfully",
        user: {
          id: newUser._id,
          name: newUser.name,
          bio: newUser.bio,
          email: newUser.email,
          gender: newUser.gender,
          birthdate: newUser.birthdate,
          profileImage: newUser.profileImage,
        },
        accessToken,
        refreshToken,
      });
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

      if(!isMatch) return res.status(401).json({ message: "password_not_match" });

      const accessToken = jwt.sign({ id: user._id }, authConfig.secret, {
        expiresIn: authConfig.jwtExpiration,
      });

      const refreshToken = await createRefreshToken(user._id, remember);

      return res.status(200).json({
        user: {
          id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          gender: user.gender,
          birthday: user.birthdate,
          role: user.role,
        },
        accessToken,
        refreshToken: refreshToken,
        message: "login_successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

export const logout = (req, res) => {
  const { refreshToken: requestToken } = req.body;
  RefreshToken.findOneAndDelete({ token: requestToken })
    .exec()
    .then((token) => {
      return res
        .status(200)
        .json({ message: "refresh_token_deleted_successfully" });
    })
    .catch((err) => {
      return res.status(404).json({ message: "refresh_token_not_found" });
    });
};

export const refreshAccessToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;
  RefreshToken.findOne({ token: requestToken })
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
          return res.status(200).json({
            accessToken: accessToken,
            refreshToken: newRefreshToken.token,
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
};
