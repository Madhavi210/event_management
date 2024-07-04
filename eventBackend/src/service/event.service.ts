import { ClientSession, Types } from 'mongoose';
import { Event } from '../model/event.model';
import { IEvent } from '../interface/event.interface';
import AppError from '../utils/errorHanler';
import StatusConstants from '../constant/statusConstant';

export default class EventService {
  public static async createEvent( title:string, description:string, date:Date, location:string , createdBy:string,  session: ClientSession): Promise<IEvent> {
    const newEvent = new Event({
         title, description, date, location , createdBy
      
    });
    await newEvent.save({ session });
    return newEvent.toObject();
  }

  public static async getEventById(id: string): Promise<IEvent | null> {
    return Event.findById(id).populate('createdBy').populate('registrations').exec();
  }

  public static async updateEvent(id: string, updates: Partial<IEvent>, session: ClientSession): Promise<IEvent | null> {
    const updatedEvent = await Event.findByIdAndUpdate(id, updates, { new: true, session }).exec();
    return updatedEvent ? updatedEvent.toObject() : null;
  }

  public static async deleteEvent(id: string, session: ClientSession): Promise<void> {
    await Event.findByIdAndDelete(id).session(session).exec();
  }

  public static async getAllEvents(): Promise<IEvent[]> {
    return Event.find().populate('createdBy').populate('registrations').exec();
  }
}
