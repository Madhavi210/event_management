// src/services/user.service.ts
import mongoose, { ClientSession } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../model/user.model';
import IUser  from '../interface/user.interface';
import AppError from '../utils/errorHanler';
import StatusConstants from '../constant/statusConstant';
import { SECRET_KEY } from '../config/config';
import App from '..';

export default class UserService {
  public static async createUser(
    name: string,
    email: string,
    password: string,
    session: ClientSession
  ): Promise<IUser> {
    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      throw new AppError(
        StatusConstants.DUPLICATE_KEY_VALUE.body.message,
        StatusConstants.DUPLICATE_KEY_VALUE.httpStatusCode
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save({ session });
    return newUser.toObject(); // Convert Mongoose document to plain object
  }

  public static async getUserById(id: string): Promise<IUser | null> {
    return User.findById(id).exec();
  }

  public static async getAllUsers(): Promise<IUser[]> {
    return User.find().exec();
  }
  
  public static async updateUser(
    id: string,
    updates: Partial<IUser>,
    session: ClientSession
  ): Promise<IUser | null> {
    const user = await User.findByIdAndUpdate(id, updates, { new: true, session }).exec();
    if (!user) {
      throw new AppError(
        StatusConstants.NOT_FOUND.body.message,
        StatusConstants.NOT_FOUND.httpStatusCode
      );
    }
    return user.toObject();
  }

  public static async deleteUser(id: string, session: ClientSession): Promise<void> {
    const user = await User.findByIdAndDelete(id).session(session).exec();
    if (!user) {
      throw new AppError(
        StatusConstants.NOT_FOUND.body.message,
        StatusConstants.NOT_FOUND.httpStatusCode
      );
    }
  }

  public static async loginUser(
    email: string,
    password: string
  ): Promise<{ userId: string; token: string }> {
    const user = await User.findOne({ email }).exec();
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AppError(
        StatusConstants.UNAUTHORIZED.body.message,
        StatusConstants.UNAUTHORIZED.httpStatusCode
      );
    }
    if (!SECRET_KEY) {
      throw new AppError(
        StatusConstants.INTERNAL_SERVER_ERROR.body.message,
        StatusConstants.INTERNAL_SERVER_ERROR.httpStatusCode
      );
    }
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
    user.token = token;
    await user.save();
    return { userId: String(user._id), token };
  }
}
