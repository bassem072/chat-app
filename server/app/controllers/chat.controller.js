import { chatPagination } from "../helpers/pagination.helper";
import Chat from "../models/chat";
import Message from "../models/message";
import { getUsers } from "../services/users.service";

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
  const { name, users } = req.body;

  const chatData = {
    users: [req.userId, ...users],
    name,
    isGroupChat: true,
    groupAdmins: [req.userId],
  };

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
  const { id } = req.params.id;

  Chat.findById(id)
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
  const id = req.params.id;
  const { name } = req.body;
  Chat.findByIdAndUpdate(id, { name }, { new: true })
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
  const { id } = req.body;

  Message.deleteMany({ chatId: id })
    .then((res) => {
      Chat.findById(id)
        .then((chat) => {
          return res.status(200).json(chat);
        })
        .catch((err) => {
          return res
            .status(404)
            .json({ message: "can_not_delete_chat", error: err });
        });
    })
    .catch((err) => {
      return res
        .status(404)
        .json({ message: "can_not_delete_chat", error: err });
    });
};

export const addUserToGroup = (req, res) => {
  const { id } = req.body;
  const { userId } = req.body;

  Chat.findByIdAndUpdate(
    id,
    {
      $push: { users: userId },
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
  const { id } = req.body;
  const { userId } = req.body;

  Chat.findByIdAndUpdate(
    id,
    {
      $pull: { users: userId },
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
