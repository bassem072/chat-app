import { chatPagination } from "../helpers/pagination.helper.js";
import Chat from "../models/chat.js";
import Message from "../models/message.js";
import { getUsers } from "../services/users.service.js";

export const indexChats = async (req, res) => {
  const pagination = chatPagination(req.query ?? {});
  const querySearch = query.searchString ?? "";

  const users = getUsers({
    query: {
      name: {
        $regex: querySearch,
        $options: "i",
      },
    },
    fields: "_id",
  });

  query = {
    isGroupChat: false,
    $and: [
      {
        users: req.userId,
      },
      {
        users: {
          $in: users.map((user) => user._id),
        },
      },
    ],
  };

  Chat.find(query, pagination)
    .populate("users", "-password")
    .populate("groupAdmins", "-password")
    .populate("latestMessage")
    .then((chats) => {
      return res.status(200).json({ message: "get_chats_successfully", chats });
    })
    .catch((err) => {
      return res.status(404).json({ message: "can_not_found_chats", err });
    });
};

export const indexGroupChats = async (req, res) => {
  const pagination = chatPagination(req.query ?? {});
  const querySearch = query.searchString ?? "";

  const users = getUsers({
    query: {
      name: {
        $regex: querySearch,
        $options: "i",
      },
    },
    fields: "_id",
  });

  query = {
    isGroupChat: true,
    users: req.userId,
    $or: [
      {
        name: {
          $regex: querySearch,
          $options: "i",
        },
        users: {
          $in: users.map((user) => user._id),
        },
      },
    ],
  };

  Chat.find(query, pagination)
    .populate("users", "-password")
    .populate("groupAdmins", "-password")
    .populate("latestMessage")
    .then((chats) => {
      return res.status(200).json({ message: "get_chats_successfully", chats });
    })
    .catch((err) => {
      return res.status(404).json({ message: "can_not_found_chats", err });
    });
};

export const store = (req, res) => {
  const body = req.body;

  const chatData = {
    users: body.users,
  };

  if (body.isGroupChat) {
    chatData.isGroupChat = true;
    chatData.name = body.name;
    chatData.groupAdmins = [req.userId];
  }

  const chat = new Chat(chatData);

  chat
    .save()
    .then((newChat) => {
      Chat.findById(newChat._id)
        .populate("users", "-password")
        .populate("groupAdmins", "-password")
        .then((added_chat) => {
          return res
            .status(201)
            .json({ message: "add_chat_successfully", added_chat });
        })
        .catch((err) => {
          return res
            .status(404)
            .json({ message: "chat_not_found", error: err });
        });
    })
    .catch((err) => {
      return res
        .status(401)
        .json({ message: "can_not_create_chat", error: err });
    });
};

export const show = (req, res) => {
  const { id } = req.params;

  Chat.findOne({ _id: id, users: req.userId })
    .populate("users", "-password")
    .populate("groupAdmins", "-password")
    .populate("latestMessage")
    .then((chat) => {
      return res.status(200).json({ message: "get_chat_successfully", chat });
    })
    .catch((err) => {
      return res.status(404).json({ message: "chat_not_found", err });
    });
};

export const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  Chat.findOneAndUpdate(
    { _id: id, groupAdmins: req.userId, isGroupChat: true },
    { name },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmins", "-password")
    .populate("latestMessage")
    .then((chat) => {
      return res.status(200).json({ message: "chat_updated", chat });
    })
    .catch((err) => {
      return res.status(400).json({ message: "can_not_update_chat", err });
    });
};

export const destroy = (req, res) => {
  const { id } = req.params;

  Chat.findById(id)
    .populate("users", "-password")
    .populate("groupAdmins", "-password")
    .populate("latestMessage")
    .then((chat) => {
      const admins = chat.groupAdmins.map((user) => user._id);

      if (admins.includes(req.userId)) {
        Message.deleteMany({ chatId: id })
          .then((messages) => {
            chat
              .deleteOne()
              .then((chat) => {
                return res.status(200).json({
                  message: "delete_chat_successfully",
                  chat,
                  messages,
                });
              })
              .catch((err) => {
                return res
                  .status(404)
                  .json({ message: "can_not_delete_chat", err });
              });
          })
          .catch((err) => {
            return res
              .status(404)
              .json({ message: "can_not_delete_chat", err });
          });
      } else {
        return res.status(404).json({ message: "can_not_delete_chat", err });
      }
    })
    .catch((err) => {
      return res
        .status(401)
        .json({ message: "you_do_not_have_access_to_delete_chat", err });
    });
};

export const clear = (req, res) => {
  const { id } = req.params;

  Chat.findById(id)
    .populate("users", "-password")
    .populate("groupAdmins", "-password")
    .populate("latestMessage")
    .then((chat) => {
      const admins = chat.groupAdmins.map((user) => user._id);

      if (admins.includes(req.userId)) {
        Message.deleteMany({ chatId: id })
          .then((messages) => {
            return res
              .status(200)
              .json({ message: "clear_chat_successfully", chat, messages });
          })
          .catch((err) => {
            return res.status(404).json({ message: "can_not_clear_chat", err });
          });
      } else {
        return res.status(404).json({ message: "can_not_clear_chat", err });
      }
    })
    .catch((err) => {
      return res
        .status(401)
        .json({ message: "you_do_not_have_access_to_clear_chat", err });
    });
};

export const addUserToGroup = (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  Chat.findOneAndUpdate(
    {
      _id: id,
      isGroupChat: true,
      groupAdmins: req.userId,
    },
    {
      $addToSet: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage")
    .then((chat) => {
      return res.status(200).json({ message: "user_added", chat });
    })
    .catch((err) => {
      return res.status(400).json({ message: "can_not_add_user", err });
    });
};

export const RemoveUserFromGroup = (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  Chat.findOneAndUpdate(
    { _id: id, isGroupChat: true, groupAdmins: req.userId },
    {
      $pull: { groupAdmins: userId, users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage")
    .then((chat) => {
      return res.status(200).json({ message: "user_removed", chat });
    })
    .catch((err) => {
      return res.status(400).json({ message: "can_not_remove_user", err });
    });
};

export const addAdminToGroup = (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  Chat.findOneAndUpdate(
    {
      _id: id,
      isGroupChat: true,
      groupAdmins: req.userId,
      users: userId,
    },
    {
      $addToSet: { groupAdmins: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage")
    .then((chat) => {
      return res.status(200).json({ message: "user_added", chat });
    })
    .catch((err) => {
      return res.status(400).json({ message: "can_not_add_user", err });
    });
};

export const RemoveAdminFromGroup = (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  Chat.findOneAndUpdate(
    {
      _id: id,
      isGroupChat: true,
      $and: [{ groupAdmins: req.userId }, { groupAdmins: userId }],
    },
    {
      $pull: { groupAdmins: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage")
    .then((chat) => {
      return res.status(200).json({ message: "user_removed", chat });
    })
    .catch((err) => {
      return res.status(400).json({ message: "can_not_remove_user", err });
    });
};
