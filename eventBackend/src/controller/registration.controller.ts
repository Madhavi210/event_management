import { Request, Response, NextFunction } from "express";
import mongoose, { ClientSession } from "mongoose";
import RegistrationService from "../service/registration.service";
import StatusConstants from "../constant/statusConstant";
import { StatusCode } from "../enum/statusCode";

export default class RegistrationController {
  public static async registerUserForEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { eventId } = req.params;
    const { userId } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const newRegistration = await RegistrationService.registerUserForEvent(eventId, userId, session);
      await session.commitTransaction();
      session.endSession();
      res.status(StatusCode.CREATED).json(newRegistration);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      next(error);
    }
  }

  public static async getAllRegistrationsForEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { eventId } = req.params;
    try {
      const registrations = await RegistrationService.getAllRegistrationsForEvent(eventId);
      res.status(StatusCode.OK).json(registrations);
    } catch (error) {
      next(error);
    }
  }

  public static async deleteRegistration(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { registrationId } = req.params;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      await RegistrationService.deleteRegistration(registrationId, session);
      await session.commitTransaction();
      session.endSession();
      res.status(StatusCode.NO_CONTENT).send();
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      next(error);
    }
  }
}
