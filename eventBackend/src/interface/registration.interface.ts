import mongoose, { Document, Types , Schema} from "mongoose";

export interface IRegistration extends Document {
    id?: string;
    eventId: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    registeredAt: Date;
  }
  