import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from 'src/app/core/services/registration/registration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-registraion',
  templateUrl: './event-registraion.component.html',
  styleUrls: ['./event-registraion.component.scss']
})
export class EventRegistraionComponent implements OnInit {

  eventRegistrationForm!: FormGroup;
  eventId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private registrationService: RegistrationService,
    private router:Router
  ) { 
    this.eventRegistrationForm = this.fb.group({
      userId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
  }

  onSubmit(): void {
    if (this.eventRegistrationForm.valid) {
      const userId = this.eventRegistrationForm.value.userId;
      if (this.eventId) {
        this.registrationService.registerUserForEvent(this.eventId, userId).subscribe(
          (result) => {
            Swal.fire("success",'User registered successfully',"success");
            this.eventRegistrationForm.reset();
          },
          (error) => {
            console.error('Error registering user:', error);
          }
        );
      } else {
        console.error('Event ID is missing');
      }
    } else {
      this.eventRegistrationForm.markAllAsTouched();
    }
  }

  goBackToEvent(): void {
    if (this.eventId) {
      this.router.navigate(['/events', this.eventId]);
    } else {
      console.error('Event ID is missing');
    }
  }
}
