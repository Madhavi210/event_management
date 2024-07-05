import { IRegistration } from './../../../../../eventBackend/src/interface/registration.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../../core/services/events/events.service';
import { IEvent } from '../../core/interfaces/event.interface';
import { IUser } from '../../core/interfaces/user.interface';
import { RegistrationService } from 'src/app/core/services/registration/registration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  event: IEvent | undefined;
  registeredUsers: IRegistration[] = [];
  registerId: string | null = null;  
  eventId : string | null = null;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventsService,
    private registrationService : RegistrationService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.getEventDetails();
    this.getRegisteredUsers();
  }

  getEventDetails(): void {
    
    if (this.eventId) {
      this.eventService.getEventById(this.eventId).subscribe(
        (event: IEvent) => {
          this.event = event;
          console.log(event, "event detail");
        },
        (error) => {
          console.error('Error fetching event details:', error);
        }
      );
    }
  }

  getRegisteredUsers(): void {
    if (this.eventId) {
      this.registrationService.getAllRegistrationsForEvent(this.eventId).subscribe(
        (registrations: IRegistration[]) => { // Corrected to IRegistration[]
          this.registeredUsers = registrations; // Assign registrations to registeredUsers
          console.log(this.registeredUsers, "register user", this.registeredUsers[0]._id);
        },
        (error) => {
          console.error('Error fetching registered users:', error);
        }
      );
    }
  }

  deleteRegistration(registerId:any):void {
    if(confirm(`Are you sure to detele ${registerId}`)){
      this.registrationService.deleteRegistration(registerId).subscribe(
        response => {
          Swal.fire("success", "registred user deleted successfully", "success")
          this.registeredUsers = this.registeredUsers.filter(user => user._id !== registerId);
        }, error => {
          console.error(error);
        }
      );
    }
  }

  addUserForEvent():void {
    if(this.eventId){
      this.router.navigate(['event-registration', this.eventId]);
    }
  }

  deleteEvent(): void {
    if(confirm(`Are you sure to delete this event ${this.eventId}`)){
      if (this.eventId) {
        this.eventService.deleteEvent(this.eventId).subscribe(
          response => {
            Swal.fire("success", "Event deleted successfully", "success");
            this.router.navigate(['/dashboard']); // Redirect to dashboard after deletion
          },
          error => {
            console.error('Error deleting event:', error);
          }
        );
      }
    }
  }

  editEvent():void {
    if (this.eventId) {
      this.router.navigate(['edit-event', this.eventId]);
    }
  }

}
