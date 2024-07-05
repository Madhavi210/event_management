import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/core/services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit{
  registrationForm!: FormGroup;
  userId: string | null = null;

  constructor(private fb:FormBuilder, private router:Router ,private route:ActivatedRoute, private userService:UserService){
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]], // Minimum length of 3 characters
      email: ['', [Validators.required, Validators.email, ]], // Valid email and from allowed domains
      password: ['', [Validators.required, Validators.minLength(3), ]], // Minimum length of 6, complex password
    });
  }

  ngOnInit(): void {}

  onSubmit() : void {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
        this.userService.createUser(formData).subscribe(
          (response) => {
            console.log("registration is successful");
            Swal.fire('Success', 'Registration successful', 'success');
            this.router.navigate(['/login'])
          }, error => {
            console.error("error in creating user", error);
            Swal.fire('Error', 'Registration failed', 'error');
          }
        );
      }
    else{
      console.error("error in submiting");
      Swal.fire('Error', 'Invalid form data', 'error');
    }
  }


}
