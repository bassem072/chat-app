export const checkChat = (req, res, next) => {
  const { chatId } = req.params;

  Chat.findOne({ _id: chatId, users: req.userId })
    .then((_) => {
      next();
    })
    .catch((err) => {
      return res.status(404).json({ message: "chat_not_found", err });
    });
};

export const checkMessage = (req, res, next) => {
  const { content, type = "text", fileUrl } = req.body;

  if (!content && type === "text") {
    return res
      .status(404)
      .json({ message: "please_add_content_to_message", err });
  } else {
    if (type !== "text" && !fileUrl) {
      return res.status(404).json({ message: "please_add_file", err });
    } else {
      next();
    }
  }
};
