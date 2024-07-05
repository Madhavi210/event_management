import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../../core/services/events/events.service';
import { IEvent } from '../../core/interfaces/event.interface';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  eventForm: FormGroup;
  userId : string | null = null;
  isEdit: boolean = false;
  eventId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private eventsService: EventsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userId = localStorage.getItem('userId');
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: [new Date(), Validators.required],
      location: ['', Validators.required],
      createdBy: [this.userId, Validators.required], // User ID should be populated from authenticated user
      registrations: [[]]
    });
  }


  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.isEdit = !!this.eventId;
    this.eventId = this.route.snapshot.paramMap.get('id');
    // console.log(this.eventId, this.isEdit);
    if (this.userId) {
      this.eventForm.patchValue({ createdBy: this.userId });
    }
    if (this.eventId) {
      this.eventsService.getEventById(this.eventId).subscribe(
        (event: IEvent) => {
          console.log(event);
          if (event.date) {
            event.date = new Date(event.date);
          }
          this.eventForm.patchValue(event);
          this.isEdit = true;
        },
        (error) => {
          console.error('Error fetching event details:', error);
        }
      );
    } else {
      if (this.userId) {
        this.eventForm.patchValue({ createdBy: this.userId });
      }
    }
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const event: IEvent = this.eventForm.value;
      if (this.isEdit && this.eventId) {
        this.eventsService.updateEvent(this.eventId, event).subscribe(
          (res: any) => {
            console.log('Event updated successfully:', res);
            this.router.navigate(['/dashboard']); 
          },
          (error) => {
            console.error('Error updating event:', error);
          }
        );
      } else {
        this.eventsService.createEvent(event).subscribe(
          (res: any) => {
            console.log('Event created successfully:', res);
            this.router.navigate(['/dashboard']); 
          },
          (error) => {
            console.error('Error creating event:', error);
          }
        );
      }
    } 
  }


}
