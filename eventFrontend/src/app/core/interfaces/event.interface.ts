import { IRegistration } from "./registration.interface";

export interface IEvent {
    id?: String;
    title: string;
    description: string;
    date: Date;
    location: string;
    createdBy: string; // User ID
    registrations: IRegistration[];
  }
  
