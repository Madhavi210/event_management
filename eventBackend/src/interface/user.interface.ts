import mongoose, { Document, Types } from "mongoose";
export default interface IUser extends Document{
    id?: string;
    name: string;
    email: string;
    password: string;
    token: string;
  }