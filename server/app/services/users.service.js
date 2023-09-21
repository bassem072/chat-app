import User from "../models/user";

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
