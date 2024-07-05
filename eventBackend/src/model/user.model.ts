import { Schema, model, Document } from "mongoose";
import IUser from "../interface/user.interface";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: { type: String , default: null},
  },
  { timestamps: true }
);

const User = model<IUser>("User", userSchema);
export { User, IUser };
