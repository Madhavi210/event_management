

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `http://localhost:3000/api/user`; // Adjust to your API endpoint

  constructor(private http: HttpClient) {}

  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, user);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  updateUser(id: string, updates: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, updates);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  // loginUser(email: string, password: string): Observable<any> {
  //   return this.http.post<any>(`${this.baseUrl}/login`, { email, password });
  // }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }
}

