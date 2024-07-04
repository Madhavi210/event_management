import express from "express";
import RegistrationController from "../controller/registration.controller";
// import Authentication from "../middleware/authentication";

export default class RegistrationRouter {
  private router: express.Router;

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  private routes() {
    // POST /api/events/:eventId/register - Register user for an event
    this.router.post("/:eventId/register",  RegistrationController.registerUserForEvent);

    // GET /api/events/:eventId/registrations - Get all registrations for an event
    this.router.get("/:eventId/registrations",  RegistrationController.getAllRegistrationsForEvent);

    // DELETE /api/registrations/:registrationId - Delete a registration
    this.router.delete("/:registrationId",  RegistrationController.deleteRegistration);
  }

  public getRouter() {
    return this.router;
  }
}
