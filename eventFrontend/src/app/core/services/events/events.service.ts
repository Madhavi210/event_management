
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private baseUrl = `http://localhost:3000/api/event`;

  constructor(private http: HttpClient) {}

  createEvent(event: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, event);
  }

  getEventById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  updateEvent(id: string, updates: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, updates);
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  getAllEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}
