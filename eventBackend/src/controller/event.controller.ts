import { Request, Response, NextFunction } from 'express';
import mongoose, { ClientSession, Types } from 'mongoose';
import EventService from '../service/event.service';
import AppError from '../utils/errorHanler';
import StatusConstants from '../constant/statusConstant';
import { StatusCode } from '../enum/statusCode';
import { IEvent } from '../interface/event.interface';

export default class EventController {
  public static async createEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { title, description, date, location , createdBy} = req.body;
    // const createdBy = req.user.id; // Assuming you have middleware to extract user ID
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const eventData = { title, description, date, location, createdBy };
      const newEvent = await EventService.createEvent( title, description, date, location, createdBy , session);
      await session.commitTransaction();
      session.endSession();
      res.status(StatusCode.CREATED).json(newEvent);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      next(error);
    }
  }

  public static async getEventById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const eventId = req.params.id;
    try {
      const event = await EventService.getEventById(eventId);
      if (!event) {
        throw new AppError(StatusConstants.NOT_FOUND.body.message, StatusConstants.NOT_FOUND.httpStatusCode);
      }
      res.status(StatusCode.OK).json(event);
    } catch (error) {
      next(error);
    }
  }

  public static async updateEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    const eventId = req.params.id;
    const updates = req.body;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const updatedEvent = await EventService.updateEvent(eventId, updates, session);
      if (!updatedEvent) {
        throw new AppError(StatusConstants.NOT_FOUND.body.message, StatusConstants.NOT_FOUND.httpStatusCode);
      }
      await session.commitTransaction();
      session.endSession();
      res.status(StatusCode.OK).json(updatedEvent);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      next(error);
    }
  }

  public static async deleteEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    const eventId = req.params.id;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      await EventService.deleteEvent(eventId, session);
      await session.commitTransaction();
      session.endSession();
      res.status(StatusCode.NO_CONTENT).send();
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      next(error);
    }
  }

  public static async getAllEvents(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const events = await EventService.getAllEvents();
      res.status(StatusCode.OK).json(events);
    } catch (error) {
      next(error);
    }
  }
}
