import Chat from "../models/chat";

export const index = (req, res) => {};

export const store = (req, res) => {
  const { name, users, isGroupChat = false } = req.body;

  const chat = new Chat({
    isGroupChat,
    users: [req.userId, ...users],
    groupAdmins: [req.userId],
  });

  if (isGroupChat) {
    chat.name = name;
  }

  chat
    .save()
    .then((newChat) => {
      return res.status(201).json(chat);
    })
    .catch((err) => {
      return res
        .status(401)
        .json({ message: "can_not_create_chat", error: err });
    });
};

export const show = (req, res) => {
  const { id } = req.body;

  Chat.findById(id)
    .then((chat) => {})
    .catch((err) => {
      return res
        .status(404)
        .json({ message: "chat_not_found", error: err });
    });
};

export const update = (req, res) => {};

export const destroy = (req, res) => {};
