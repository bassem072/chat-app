import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    chatId: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      trim: true,
    },
    messageType: {
      type: String,
      enum: ["text", "photo", "video", "file", "record"],
    },
    fileUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Message = model("Message", schema);

export default Message;
