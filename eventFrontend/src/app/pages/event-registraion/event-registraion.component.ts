import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RegistrationService } from 'src/app/core/services/registration/registration.service';

@Component({
  selector: 'app-event-registraion',
  templateUrl: './event-registraion.component.html',
  styleUrls: ['./event-registraion.component.scss']
})
export class EventRegistraionComponent {

  eventRegistrationForm!: FormGroup;
  eventId:any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private registrationService: RegistrationService
  ) { }

  ngOnInit(): void {
    this.createEventRegistrationForm();
    this.eventId = this.route.snapshot.paramMap.get('id')

  }

  createEventRegistrationForm(): void {
    this.eventRegistrationForm = this.fb.group({
      userId: ['', Validators.required],
      eventId: [this.route.snapshot.params['id'], Validators.required],
    });
  }

  onSubmit(): void {
    if (this.eventRegistrationForm.valid) {
      const { userId, eventId } = this.eventRegistrationForm.value;
      this.registrationService.registerUserForEvent(eventId, userId).subscribe(
        (result) => {
          // Handle success
          console.log('User registered successfully:', result);
          // Optionally reset the form
          this.eventRegistrationForm.reset();
        },
        (error) => {
          // Handle error
          console.error('Error registering user:', error);
        }
      );
    }
  }

  // get f() {
  //   return this.eventRegistrationForm.controls;
  // }
}
