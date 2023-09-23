import User from "../models/user.js";

export const getUsers = ({ query = {}, fields = "", pagination = {} }) => {
  User.find(query, pagination)
    .select(fields)
    .then((users) => {
      return users;
    })
    .catch((_) => {
      return [];
    });
};
