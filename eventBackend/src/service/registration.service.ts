import { ClientSession } from "mongoose";
import { Registration } from "../model/registration.model";
import { IRegistration } from "../interface/registration.interface";

export default class RegistrationService {
  public static async registerUserForEvent(
    eventId: string,
    userId: string,
    session: ClientSession
  ): Promise<IRegistration> {
    const existingRegistration = await Registration.findOne({ eventId, userId }).session(session);
    if (existingRegistration) {
      throw new Error("User is already registered for this event.");
    }

    const newRegistration = new Registration({ eventId, userId });
    await newRegistration.save({ session });
    return newRegistration.toObject();
  }

  public static async getAllRegistrationsForEvent(eventId: string): Promise<IRegistration[]> {
    return Registration.find({ eventId }).exec();
  }

  public static async deleteRegistration(registrationId: string, session: ClientSession): Promise<void> {
    await Registration.findByIdAndDelete(registrationId).session(session).exec();
  }
}
