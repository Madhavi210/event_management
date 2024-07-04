import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventsService } from '../../core/services/events/events.service';
import { IEvent } from '../../core/interfaces/event.interface';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  eventForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventsService: EventsService,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: [new Date(), Validators.required],
      location: ['', Validators.required],
      createdBy: ['', Validators.required], // User ID should be populated from authenticated user
      registrations: [[]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const event: IEvent = this.eventForm.value;
      this.eventsService.createEvent(event).subscribe(
        (res: any) => {
          console.log('Event created successfully:', res);
          this.router.navigate(['/dashboard']); // Navigate to dashboard after successful creation
        },
        (error) => {
          console.error('Error creating event:', error);
          // Handle error here, e.g., show error message
        }
      );
    } else {
      // Mark all fields as touched to display validation errors
      this.eventForm.markAllAsTouched();
    }
  }
}
