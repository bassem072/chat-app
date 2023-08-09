import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    chatName: {
      type: String,
      required: [true, "chatName is required field"],
      maxlength: 200,
      trim: true,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmins: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Chat = model("Chat", schema);

export default Chat;
