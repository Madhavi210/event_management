
import { IRegistration } from "./registration.interface";
import mongoose, { Document, Types , Schema} from "mongoose";

export interface IEvent extends Document{
    id?: String;
    title: string;
    description: string;
    date: Date;
    location: string;
    createdBy: Schema.Types.ObjectId; // User ID
    registrations: IRegistration[];
  }
  