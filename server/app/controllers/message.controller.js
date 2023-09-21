import Chat from "../models/chat";
import Message from "../models/message";

export const index = (req, res) => {
  const { chatId } = req.params;
  Message.find({ chatId })
    .populate("sender", "name profileImage email")
    .populate("chat")
    .then((messages) => {
      return res
        .status(200)
        .json({ message: "get_messages_successfully", messages });
    })
    .catch((err) => {
      return res.status(404).json({ message: "can_not_found_messages", err });
    });
};

export const send = (req, res) => {
  const body = req.body;
  const { content, type, chatId } = body;
  const data = { content, messageType: type, chatId, sender: req.userId };

  if (type !== "text") {
    data.fileUrl = req.file.filename;
  }

  const message = new Message(data);

  message
    .save()
    .then((newMessage) => {
      Chat.findByIdAndUpdate(
        chatId,
        {
          latestMessage: newMessage,
        },
        { new: true }
      )
        .populate("users", "-password")
        .populate("groupAdmins", "-password")
        .populate("latestMessage")
        .then((chat) => {
          Message.findByIdAndUpdate(newMessage._id)
            .populate("sender", "name profileImage email")
            .populate("chat")
            .then((addedMessage) => {
              return res
                .status(200)
                .json({ message: "send_message_successfully", message, chat });
            })
            .catch((err) => {
              return res
                .status(404)
                .json({ message: "can_not_send_message", err });
            });
        })
        .catch((err) => {
          return res.status(404).json({ message: "can_not_send_message", err });
        });
    })
    .catch((err) => {
      return res.status(404).json({ message: "can_not_send_message", err });
    });
};

export const show = (req, res) => {
  const { id } = req.params;

  Message.findById({ id })
    .populate("sender", "name profileImage email")
    .populate("chat")
    .then((message) => {
      return res
        .status(200)
        .json({ message: "get_message_successfully", message });
    })
    .catch((err) => {
      return res.status(404).json({ message: "can_not_found_message", err });
    });
};

export const update = (req, res) => {};

export const destroy = (req, res) => {};
