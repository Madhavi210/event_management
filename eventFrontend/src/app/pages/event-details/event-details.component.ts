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
    this.getEventDetails();
    this.getRegisteredUsers();
    this.eventId = this.route.snapshot.paramMap.get('id');
  }

  getEventDetails(): void {
    
    if (this.eventId) {
      this.eventService.getEventById(this.eventId).subscribe(
        (event: IEvent) => {
          this.event = event;
        },
        (error) => {
          console.error('Error fetching event details:', error);
        }
      );
    }
  }

  getRegisteredUsers(): void {
    // const eventId = this.route.snapshot.paramMap.get('id');
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
    this.registrationService.deleteRegistration(registerId).subscribe(
      response => {
        Swal.fire("success", "registred user deleted successfully", "success")
      }, error => {
        console.error(error);
      }
    )
  }

  addUserForEvent():void {
    console.log(this.eventId);
    
    if(this.eventId){
      this.router.navigate(['event-registration', this.eventId]);
    }
  }

}
