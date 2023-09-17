import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is a required field"],
    },
    email: {
      type: String,
      required: [true, "Email is a required field"],
      unique: [true, "Email is a unique field"],
    },
    password: {
      type: String,
    },
    bio: {
      type: String,
      default: "Hello, I'm here.",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    birthdate: {
      type: Date,
      required: [true, "Birthdate is a required field"],
    },
    profileImage: {
      type: String,
      default: "user.png",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
    },
  },
  {
    timestamps: true,
  }
);

schema.methods.matchPassword = async function (givenPass) {
  return await bcrypt.compare(givenPass, this.password);
};

schema.pre("save", async function hashPassword(next) {
  if (!this.isModified) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

const User = model("User", schema);

export default User;
