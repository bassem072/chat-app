import { Schema, model } from "mongoose";

const schema = new Schema({
  token: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  expiryDate: Date,
  remember: {
    type: Boolean,
    default: false,
  },
});

const RefreshToken = model("RefreshToken", schema);

export default RefreshToken;
