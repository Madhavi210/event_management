import { Schema, model, Document } from "mongoose";
import { Event } from "./event.model";
import { User } from "./user.model";
import { IRegistration } from "../interface/registration.interface";

const registrationSchema = new Schema<IRegistration>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    registeredAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Registration = model<IRegistration>("Registration", registrationSchema);
export { Registration, IRegistration };
