import { Schema, model, Document } from "mongoose";
import { IUser } from "../interface/user.interface";
import { User } from "./user.model";
import { IEvent } from "../interface/event.interface";
import { IRegistration } from "./registration.model";

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    registrations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Registration",
      },
    ],
  },
  { timestamps: true }
);

const Event = model<IEvent>("Event", eventSchema);
export { Event, IEvent };
