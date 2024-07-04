
import { IRegistration } from './../../../../../../eventBackend/src/interface/registration.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl = `http://localhost:3000/api/registerUser`;

  constructor(private http: HttpClient) {}

  // Register a user for an event
  registerUserForEvent(eventId: string, userId: string): Observable<IRegistration> {
    return this.http.post<IRegistration>(`${this.apiUrl}/${eventId}/register`, { userId });
  }

  // Get all registrations for an event
  getAllRegistrationsForEvent(eventId: string): Observable<IRegistration[]> {
    return this.http.get<IRegistration[]>(`${this.apiUrl}/${eventId}/registrations`);
  }

  // Delete a registration
  deleteRegistration(registrationId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${registrationId}`);
  }
}
