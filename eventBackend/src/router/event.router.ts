import express from 'express';
import EventController from '../controller/event.controller';
// import Authentication from '../middleware/authentication';

export default class EventRouter {
  private router: express.Router;

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  private routes() {
    // POST /api/events - Create a new event
    this.router.post('/', EventController.createEvent);

    // GET /api/events/:id - Get event by ID
    this.router.get('/:id',  EventController.getEventById);

    // PUT /api/events/:id - Update event by ID
    this.router.put('/:id',  EventController.updateEvent);

    // DELETE /api/events/:id - Delete event by ID
    this.router.delete('/:id',  EventController.deleteEvent);

    // GET /api/events - Get all events
    this.router.get('/',  EventController.getAllEvents);
  }

  public getRouter() {
    return this.router;
  }
}
